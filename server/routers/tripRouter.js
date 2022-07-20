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


//fetch for getall trips for user
router.post('/gettrips', tripController.getAlltrips, (req, res) => {
  res.status(200).send(res.locals.trips);
});



// Export router
module.exports = router;
