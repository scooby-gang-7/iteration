const { values } = require('regenerator-runtime');
const db = require('../models/userTripModels');

const tripController = {};

tripController.getAlltrips = async (req, res, next) => {
  //get all trips using user_id
  const { user_id } = req.body;
  const values = [user_id];
  const queryText = `
    SELECT R.user_id, t.* 
    FROM user_trip_rel as R
    JOIN trips as t
    ON R.trip_id = t.trip_id
    WHERE R.user_id = ($1);`;

  const tripsdata = await db.query(queryText, values);
  // console.log(tripsdata);

  res.locals.trips = tripsdata.rows;
  return next();
};

tripController.getOneTrip = async (req, res, next) => {
  const { trip_id } = req.body;
  const values = [trip_id];
  const queryText = `
    SELECT * 
    FROM trips
    WHERE trip_id = ($1)`;

  const tripData = await db.query(queryText, values);
  console.log('tripData from getOneTrip after query -->', tripData);
  res.locals.trip = tripData.rows[0];
  next();
};

tripController.createTrip = async (req, res, next) => {
  const { trip_name, description, destination, date_start, date_end, user_id } =
    req.body;

  const date = new Date();
  // convert date to MM/DD/YYYY HH:MM:SS
  const dateStr =
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    ('00' + date.getDate()).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('00' + date.getHours()).slice(-2) +
    ':' +
    ('00' + date.getMinutes()).slice(-2) +
    ':' +
    ('00' + date.getSeconds()).slice(-2);

  const queryText = `
    INSERT INTO trips (trip_name, description, destination, date_start, date_end, created_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;

  const values = [
    trip_name,
    description,
    destination,
    date_start,
    date_end,
    dateStr,
  ];
  const tripdata = await db.query(queryText, values);
  const tripValues = [user_id, tripdata.rows[0].trip_id, true];
  // console.log(tripdata);
  const queryText2 = `
    INSERT INTO user_trip_rel (user_id, trip_id, owner)
    VALUES ($1, $2, $3)
    RETURNING *;`;

  const reldata = await db.query(queryText2, tripValues);
  // console.log(reldata)

  res.locals.trip = tripdata.rows[0];
  return next();
};

tripController.getTripbuddy = async (req, res, next) => {
  const { trip_id } = req.body;
  const values = [trip_id];
  const queryText = `
    SELECT R.user_trip_id, R.trip_id, R.user_id, R.owner, u.name_first 
    FROM user_trip_rel as R
    JOIN users as u
    ON R.user_id = u.user_id
    WHERE R.trip_id = ($1);`;

  const memberdata = await db.query(queryText, values);
  console.log(memberdata);
  res.locals.members = memberdata.rows;
  return next();
};

tripController.addTripbuddy = async (req, res, next) => {
  const { trip_id, buddy_email } = req.body;
  const values = [buddy_email];
  const queryText1 = `
    SELECT user_id from users
    WHERE email=($1)`;

  const buddy_info = await db.query(queryText1, values);
  const buddy_id = buddy_info.rows[0].user_id;
  console.log('buddy info:', buddy_info);
  const buddyVal = [buddy_id, trip_id, false];
  const queryText = `
    INSERT INTO user_trip_rel (user_id, trip_id, owner)
    VALUES ($1, $2, $3)
    RETURNING *;`;

  const reldata = await db.query(queryText, buddyVal);
  // console.log(reldata);
  //do a query, get the members of the trip.
  const queryText2 = `
    SELECT R.user_trip_id, R.trip_id, R.user_id, R.owner, u.name_first 
    FROM user_trip_rel as R
    JOIN users as u
    ON R.user_id = u.user_id
    WHERE R.trip_id = ($1);`;
  const tripVal = [trip_id];
  const memberdata = await db.query(queryText2, tripVal);
  // console.log(memberdata);
  res.locals.members = memberdata.rows;

  return next();
};

module.exports = tripController;
