const db = require('../models/userTripModels');


const tripController = {};

tripController.getAlltrips = async (req, res, next) => {
    //get all trips using user_id
    const { user_id } = req.body;
    const queryText = `SELECT R.user_id, t.* 
    FROM user_trip_rel as R
    JOIN trips as t
    ON R.trip_id = t.trip_id
    WHERE R.user_id = ${user_id};`;
    
    const tripsdata = await db.query(queryText);
    console.log(tripsdata);

    res.locals.trips = tripsdata.rows;
    return next();
};


//done
tripController.createTrip = async (req, res, next) => {
    const { trip_name, description, destination, date_start, date_end, user_id } = req.body;
    const date = new Date();
    const dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + "/" +
      date.getFullYear() + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    const queryText = `INSERT INTO trips (trip_name, description, destination, date_start, date_end, created_at)
         VALUES ('${trip_name}', '${description}', '${destination}', '${date_start}', '${date_end}', '${dateStr}')
         RETURNING *;`;
    const tripdata = await db.query(queryText);
    // console.log(tripdata);
    const queryText2 = `INSERT INTO user_trip_rel (user_id, trip_id, owner)
    VALUES ('${user_id}', '${tripdata.rows[0].trip_id}', '${true}')
    RETURNING *;`;

    const reldata = await db.query(queryText2);
    // console.log(reldata)

    res.locals.trip = tripdata.rows[0];
    return next();
};


tripController.addTripbuddy = async (req, res, next) => {
    const { trip_id, buddy_id } = req.body;
    const queryText = `INSERT INTO user_trip_rel (user_id, trip_id, owner)
    VALUES ('${buddy_id}', '${trip_id}', '${false}')
    RETURNING *;`;
    
    const reldata = await db.query(queryText);
    console.log(reldata);
    //do a query, get the members of the trip.
    const queryText2 = `SELECT R.user_trip_id, R.trip_id, R.user_id, R.owner, u.name_first 
    FROM user_trip_rel as R
    JOIN users as u
    ON R.user_id = u.user_id
    WHERE R.trip_id = '${trip_id}';`;

    const memberdata = await db.query(queryText2);
    console.log(memberdata);
    res.locals.members = memberdata.rows;

    return next();
};


module.exports = tripController;