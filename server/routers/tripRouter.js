// Reqs
const path = require('path');
// Prepare Router
const express = require('express');
const router = express.Router();
// Import controllers
const tripController = require('../controllers/tripController');
const placesController = require('../controllers/placesController');

//testing for createTrip
router.post('/addtrip', tripController.createTrip, (req, res) => {
  res.status(200).send(res.locals.trip);
});

router.post('/getTrip', tripController.getOneTrip, (req, res) => {
  console.log('locals trip---', res.locals.trip);
  res.status(200).json(res.locals.trip);
});

//fetch for getall trips for user
router.post('/gettrips', tripController.getAlltrips, (req, res) => {
  res.status(200).send(res.locals.trips);
});

router.post('/addbuddy', tripController.addTripbuddy, (req, res) => {
  res.status(200).json(res.locals.members);
});

//fetch for gettripbuddy
router.post('/getbuddy', tripController.getTripbuddy, (req, res) => {
  res.status(200).send(res.locals.members);
});

router.post('/getPlaces', placesController.getAllPlaces, (req, res) => {
  res.status(200).send(res.locals.places);
});

router.post('/addplace', placesController.addPlace, (req, res) => {
  res.status(200).send(res.locals.place);
});

router.post('/vote', placesController.updateVote, (req, res) => {
  res.status(200).send(res.locals.place);
});

router.post('/deleteplace', placesController.deletePlace, (req, res) => {
  res.status(200).send(res.locals.place);
});

// Export router
module.exports = router;
