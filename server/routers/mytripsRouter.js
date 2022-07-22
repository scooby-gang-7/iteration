// Reqs
const path = require('path');
// Prepare Router
const express = require('express');
const router = express.Router();
// Import controllers
const tripController = require('../controllers/tripController');
const placesController = require('../controllers/placesController');

router.post('/addbuddy', tripController.addTripbuddy, (req, res) => {
  res.status(200).json(res.locals.members);
});

//fetch for gettripbuddy
router.post('/getbuddy', tripController.getTripbuddy, (req, res) => {
  res.status(200).send(res.locals.members);
});

router.post('/getTrip', tripController.getOneTrip, (req, res) => {
  res.status(200).send(res.locals.trip);
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

router.post('/getNotes', tripController.getTripNotes, (req, res) => {
  res.status(200).send(res.locals.tripNotes);
});

router.post('/addNotes', tripController.addTripNotes, (req, res) => {
  res.status(200).send(res.locals.tripNotes);
});

router.post('/deleteplace', placesController.deletePlace, (req, res) => {
  res.status(200).send(res.locals.place);
});

module.exports = router;
