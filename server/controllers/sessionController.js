const db = require('../models/userTripModels');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 5;

const sessionController = {};

sessionController.startSession = (req, res, next) => {
    const user_id = toString(res.locals.data[0].user_id)
    bcrypt.hash(user_id, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next({log: err, message: {err: 'err in startSession bcrypt.hash'}});
        console.log('hash --> ',hash)
        let text;
        // check to see if there is already an active session
        // text = `SELECT * FROM sessions WHERE session_id = "${hash}"`
        text = `SELECT COUNT(session_id) FROM sessions WHERE session_id = "${hash}"; `
        db
        .query(text)
        .then(data => {
            console.log ('DATA --> ', data)
            // if not, add new session
            if (data === null) {
                text = 'INSERT into sessions (session_id, created_at) VALUES ($1, $2) RETURNING *'
                const info = [hash, Date.now()]
                db
                .query(text, info)
                .then(data => {
                  window.localStorage.setItem('SESSION', JSON.stringify(hash))
                  res.locals.sessionInfo = data.rows;
                  return next();
                })
                .catch(err => next({log: 'catch in startSession 2', message: {err: 'catch in startSession'}}))
            }
            else return next();
          })
          .catch(err => next({log: err, message: {err: 'catch in startSession'}}))

    })

};

module.exports = sessionController;