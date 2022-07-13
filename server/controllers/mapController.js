const asyncHandler = require('express-async-handler');
const db = require('../models/userTripModels');

const mapController = {};

mapController.getOneLocation = (req, res, next) => {
  console.log('working on getting location');
  return next();
};

module.exports = mapController;
