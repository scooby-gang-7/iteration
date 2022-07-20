// Require Modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// Import Controllers
const socketIoController = require('./controllers/socketIoController');
// Import Routers
const authRouter = require('./routers/authRouter');
const tripRouter = require('./routers/tripRouter');
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

if (process.env.NODE_ENV === 'production') {
  console.log('working in production');

  // // enables handling of req from index.html
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
}

//use cors
app.use(cors());
//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//handling cookies
app.use(cookieParser());

// handle requests for static files
app.use('/assets', express.static('./client/assets'));
app.use(express.static(__dirname));

// Router paths
app.use('/auth', authRouter);
app.use('/trips', tripRouter); // I don't get why we have 2 routes to the same router but I consolidated them
app.use('/mytrips/trips', tripRouter);

// unique paths
app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, HTML_FILE));
});

app.post('/getmessages', socketIoController.getMessages, (req, res) => {
  res.status(200).json(res.locals.chats);
});

app.get('/', (req, res) => {
  console.log('trying to send at /');
  res.status(201).sendFile(path.resolve(__dirname, '../dist/index.html'));
});

//404 error
// app.use('/*', (req, res) => {
//   console.log('trying to send back app from 404 route');
//   console.log(req.originalUrl);
//   console.log(req.url);
//   res.status(206).sendFile(path.resolve(__dirname, '../dist/index.html'));
// });

//create global error handler
app.use((err, req, res, next) => {
  console.log(err);
  console.log('in global err handler');
  const defaultErr = {
    log: 'Caught unknown middleware error',
    staus: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

io.on('connection', (socket) => {
  socket.on('send-message', (message, room, firstName, callback) => {
    if (room) {
      // make query to get chats
      const params = [Number(room), firstName, message];
      const queryText = `
          INSERT INTO messages (trip_id, sender, message, timestamp)
          VALUES ($1, $2, $3, now())
          RETURNING *
      `;
      db.query(queryText, params).then((res) => {
        console.log(res.rows[0]);
        callback(res.rows[0]);
        socket.to(room).emit('receive-message', res.rows[0]);
      });
    } else {
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

server.listen(process.env.PORT, () => {
  console.log('server is listening on 3000');
});
