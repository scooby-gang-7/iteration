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

// run this for all requests, for cleaner log-reading
app.use((req, res, next) => {
  console.log(`${'-'.repeat(60)} a request has come in! ${'-'.repeat(60)}`);
  console.log(`${'-'.repeat(60)} source: ${req.url}`);
  next();
});

if (process.env.NODE_ENV === 'production') {
  console.log('working in production');

  // // enables handling of req from index.html
  app.use('/dist', express.static(path.join(__dirname, '../dist')));

  app.get('/', (req, res) => {
    console.log('picked up / only');
    // return res.sendStatus(200);
    return res
      .status(203)
      .sendFile(path.join(__dirname, '../client/index.html'));
  });

  // for serving static things (doesn't work!)
  app.use(
    '/client/assets/',
    (req, res, next) => {
      console.log('hit client/assets!!!!!!!!!!!');
      return next();
    },
    (req, res) => {
      console.log(path.resolve(__dirname, '../client/assets/' + req.url));
      res.sendFile(path.resolve(__dirname, '../client/assets/' + req.url));
    },
    express.static('../client/assets/')
  );
}

//use cors
app.use(cors());
//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//handling cookies
app.use(cookieParser());

// Router paths
app.use('*/api/auth', authRouter);
app.use('*/api/trips', tripRouter);

app.post('*/api/getmessages', socketIoController.getMessages, (req, res) => {
  res.status(200).json(res.locals.chats);
});

app.get('/', (req, res) => {
  console.log('trying to send at /');
  return res.sendStatus(200);
  // res.status(201).sendFile(path.resolve(__dirname, '../dist/index.html'));
});

//404 error
app.use('/*', (req, res) => {
  console.log('trying to send back app from 404 route');
  return res.sendStatus(404);
  // res.status(206).sendFile(path.resolve(__dirname, '../dist/index.html'));
});

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

  socket.on('join-room', (room, type = 'chat') => {
    if (room) {
      console.log('joining room: ', room);
      socket.join(room);
      if (type === 'bulletin') {
        console.log('just joined bulletin!');
        // emit occupy-check to room
        socket.to(room).emit('occupy-check');
      }
    }
  });

  // on send-update
  socket.on('send-update', (room, updatedPair) => {
    console.log('receiving input update');
    console.log(updatedPair);

    // update DB with new value, return value when complete
    // {_id: 3, value: 'hello'}
    const returnedPair = updatedPair

    // emit the update to all in room
    socket.to(room).emit('receive-update', returnedPair)
  });
});

server.listen(process.env.PORT, () => {
  console.log('server is listening on 3000');
});
