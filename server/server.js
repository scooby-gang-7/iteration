const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//require controller
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const tripController = require('./controllers/tripController');
const cookieController = require('./controllers/cookieController');
const placesController = require('./controllers/placesController');

//create app instance and other const variables
const app = express(),
  DIST_DIR = path.join(__dirname, '../dist/');
HTML_FILE = path.join(DIST_DIR, 'index.html');
const PORT = process.env.PORT;

//connect to the DB

//use cors
app.use(cors());

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handling cookies
app.use(cookieParser());

// handle requests for static files
// app.use(express.static(DIST_DIR));
// app.use(express.static('client'));
app.use('/assets', express.static('./client/assets'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, HTML_FILE));
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, HTML_FILE));
});

//fetch with session_id to get user_id
app.get('/session', sessionController.verifySession, (req, res) => {
  res.status(200).send(res.locals.sessionInfo);
});

//testing for get all user
app.get('/user', userController.getAllUsers, (req, res) => {
  res.status(200).send(res.locals.data);
});

app.post('/getTrip', tripController.getOneTrip, (req, res) => {
  res.status(200).send(res.locals.trip);
});

//testing for createUser
app.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).send(res.locals.sessionInfo);
  }
);

app.post('/signout', sessionController.endSession, (req, res) => {
  res.status(200).send(res.locals.sessionInfo);
});

//testing for verifyUser
app.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).send(res.locals.sessionInfo);
  }
);

//testing for createTrip
app.post('/addtrip', tripController.createTrip, (req, res) => {
  res.status(200).send(res.locals.trip);
});

//testing for addtripbuddy
app.post('/addbuddy', tripController.addTripbuddy, (req, res) => {
  res.status(200).send(res.locals.members);
});

//fetch for gettripbuddy
app.post('/getbuddy', tripController.getTripbuddy, (req, res) => {
  res.status(200).send(res.locals.members);
});

//fetch for getall trips for user
app.post('/gettrips', tripController.getAlltrips, (req, res) => {
  res.status(200).send(res.locals.trips);
});

app.post('/getPlaces', placesController.getAllPlaces, (req, res) => {
  res.status(200).send(res.locals.places);
});

app.post('/addplace', placesController.addPlace, (req, res) => {
  res.status(200).send(res.locals.place);
});

app.post('/vote', placesController.updateVote, (req, res) => {
  res.status(200).send(res.locals.place);
});

app.post('/deleteplace', placesController.deletePlace, (req, res) => {
  res.status(200).send(res.locals.place);
});

//redirect on other request
app.get('/*', (req, res) => {
  res.redirect('/');
});

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

app.listen(PORT, () => {
  console.log('listening to Port 3000');
});
