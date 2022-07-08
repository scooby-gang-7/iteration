const db = require('../models/userTripModels');

const placesController = {};

placesController.addPlace = (req, res, next) => {
    const { trip_id, google_place_id, name, address, type, lat, long } = req.body;
    const text = `INSERT INTO places
        (trip_id, google_place_id, name, address, type, up_vote, down_vote, lat, long)
        VALUES ('${trip_id}', '${google_place_id}', '${name}', '${address}', '${type}', '0', '0', '${lat}', '${long}')
        RETURNING *`

    db.query(text)
        .then(data => {
            res.locals.place = data.rows[0];
            return next();
        })
        .catch(err => {
            return next({log: err, message: {err: 'catch in addPlace'}});
        })
};


//logic for getAllplaces
placesController.getAllplaces = (req, res, next) => {
    const trip_id = req.query.trip_id;
    const text = `SELECT * FROM places
    WHERE trip_id='${trip_id}';`;
    db.query(text)
        .then(data => {
            res.locals.places = data.rows;
            return next();
        })
        .catch(err => {
            return next({log: err, message: {err: 'catch in getAllplaces'}})
        });
};

placesController.updateVote = (req, res, next) => {
    const { place_id, up_vote, down_vote } = req.body;
    const text = `UPDATE places
    SET up_vote = up_vote + '${up_vote}',
        down_vote = down_vote + '${down_vote}'
    WHERE place_id = '${place_id}' RETURNING *`;

    db.
        query(text)
        .then(data => {
            if (data.rows.length == 0) {
                // res.locals.data = {message: 'user does not exist'}; //to do throw error
                return next(createErr({
                    method:'addVote',
                    type: 'place does not exist',
                    err: 'Place does not exist'
                }));
            }
            else {
                res.locals.place = data.rows[0];
                return next();
            }
        })
        .catch(err => {
            return next({log: err, message: {err: 'catch in addVote'}});
        })
};

placesController.deletePlace = (req, res, next) => {
    const { place_id } = req.body;
    const text = `DELETE FROM places WHERE place_id = '${place_id}' RETURNING *`

    db.query(text)
    .then(data => {
        if (data.rows.length == 0) {
            // res.locals.data = {message: 'user does not exist'}; //to do throw error
            return next(createErr({
                method: 'deletePlace',
                type: 'place does not exist',
                err: 'Place does not exist'
            }));
        }
        else {
            res.locals.place = data.rows[0];
            return next();
        }
    })
    .catch(err => {
        return next({log: err, message: {err: 'catch in deletePlace'}});
    })
};

module.exports = placesController;