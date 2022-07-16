// Require Modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// Import Controllers
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const tripController = require('./controllers/tripController');
const cookieController = require('./controllers/cookieController');
const placesController = require('./controllers/placesController');
// Import Routers
const authRouter = require('./routers/authRouter');
const tripRouter = require('./routers/tripRouter');
const socketIoController = require('./controllers/socketIoController');
// connect to DB
const db = require('./models/userTripModels');

//create app instance and other const variables
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

const DIST_DIR = path.join(__dirname, '../dist/');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const PORT = process.env.PORT;

//use cors
app.use(cors());
//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//handling cookies
app.use(cookieParser());

// handle requests for static files
app.use('/assets', express.static('./client/assets'));

// Router paths
app.use('/auth', authRouter);
app.use('/trips', tripRouter);

// unique paths
app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, HTML_FILE));
});

app.post('/getmessages', socketIoController.getMessages, (req, res) => {
  console.log(res.locals);
  res.status(200).json(res.locals.chats);
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, HTML_FILE));
});

//404 error
app.use('*', (req, res) => res.status(404).send('Not Found'));

//create global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Caught unknown middleware error',
    staus: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

io.on('connection', (socket) => {
  console.log(' new user!! ', socket.id);

  socket.on('send-message', (message, room, firstName) => {
    console.log(room);
    console.log(' someone sent something! ', message);
    if (room) {
      console.log('private!');

      // make query to get chats
      const params = [room, firstName, message, 'stringytimestampy'];
      const queryText = `
          INSERT INTO messages (trip_id, sender, message, timestamp)
          VALUES ($1, $2, $3, $4)
          RETURNING *
      `;
      let newTimeStamp;
      db.query(queryText, params).then((res) => {
        console.log(res.rows[0]);
        newTimeStamp = res.rows[0].timestamp;

        console.log('sending back to client?', room);
        socket
          .to(room)
          .emit('receive-message', message, firstName, newTimeStamp);
      });
    } else {
      console.log('public, ignoring');
      // socket.broadcast.emit('receive-message', message)
    }
  });

  socket.on('join-room', (room) => {
    if (room) {
      console.log('joining room: ', room);
      socket.join(room);
    }
  });
});

// currently custom events arent' working (hello) because I can't seem to point
// to an instance of the socket from the front end
// need to find out how to properly do it. not trying to start the instance as soon as
// app starts though, only when component is called.
// ?

server.listen(process.env.PORT, () => {
  console.log('server is listening on 3000');
});
