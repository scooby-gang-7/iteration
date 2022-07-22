const db = require('../models/userTripModels');

const placesController = {};

placesController.getAllPlaces = (req, res, next) => {
  const { trip_id } = req.body;
  const values = [trip_id];
  const text = `
    SELECT * 
    FROM places 
    WHERE trip_id = ($1)`;

  db.query(text, values)
    .then((data) => {
      res.locals.places = data.rows;
      return next();
    })
    .catch((err) => {
      return next({ log: err, message: { err: 'catch in getAllPlaces' } });
    });
};

placesController.addPlace = (req, res, next) => {
  const { trip_id, google_place_id, name, address, type, lat, long } = req.body;
  const values = [trip_id, google_place_id, name, address, type, lat, long];
  const text = `
    INSERT INTO places (trip_id, google_place_id, name, address, type, up_vote, down_vote, lat, long)
    VALUES ($1, $2, $3, $4, $5, '0', '0', $6, $7)
    RETURNING *`;

  db.query(text, values)
    .then((data) => {
      res.locals.place = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({ log: err, message: { err: 'catch in addPlace' } });
    });
};

placesController.updateVote = (req, res, next) => {
  const { place_id, up_vote, down_vote } = req.body;
  const values = [place_id, up_vote, down_vote];
  const text = `
    UPDATE places
    SET up_vote = up_vote + ($2),
      down_vote = down_vote + ($3)
    WHERE place_id = ($1) RETURNING *`;

  db.query(text, values)
    .then((data) => {
      if (data.rows.length == 0) {
        // res.locals.data = {message: 'user does not exist'}; //to do throw error
        return next(
          createErr({
            method: 'addVote',
            type: 'place does not exist',
            err: 'Place does not exist',
          })
        );
      } else {
        res.locals.place = data.rows[0];
        return next();
      }
    })
    .catch((err) => {
      return next({ log: err, message: { err: 'catch in addVote' } });
    });
};

placesController.deletePlace = (req, res, next) => {
  const { place_id } = req.body;
  const values = [place_id];
  const text = `
    DELETE FROM places 
    WHERE place_id = ($1) RETURNING *`;

  db.query(text)
    .then((data) => {
      if (data.rows.length == 0) {
        // res.locals.data = {message: 'user does not exist'}; //to do throw error
        return next(
          createErr({
            method: 'deletePlace',
            type: 'place does not exist',
            err: 'Place does not exist',
          })
        );
      } else {
        res.locals.place = data.rows[0];
        return next();
      }
    })
    .catch((err) => {
      return next({ log: err, message: { err: 'catch in deletePlace' } });
    });
};

module.exports = placesController;
