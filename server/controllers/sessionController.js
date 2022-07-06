const db = require('../models/userTripModels');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 5;

const sessionController = {};

sessionController.startSession = (req, res, next) => {
    console.log('res.locals.data[0].user_id --> ',res.locals.data.user_id)
    const user_id = toString(res.locals.data.user_id)
    const date = new Date();
    // convert date to MM/DD/YYYY HH:MM:SS
    const dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + "/" +
      date.getFullYear() + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);

    // hash the user's ID to use as session ID
    bcrypt.hash(user_id, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next({log: err, message: {err: 'err in startSession bcrypt.hash'}});
        console.log('hash --> ',hash)
        console.log('date --> ',dateStr)
        res.locals.sessionId = hash;

        // try to insert new session, if session ID already exists then updated timestamp
        const text = `INSERT INTO sessions (session_id, created_at) 
        VALUES('${hash}', '${dateStr}')
        ON CONFLICT ON CONSTRAINT U_session_id
        DO UPDATE SET created_at = '${dateStr}'
        RETURNING *;`;
        db
          .query(text)
          .then(data => {
              console.log ('DATA --> ', data)
                res.locals.sessionInfo = data.rows;
                return next();
              })
          .catch(err => next({log: err, message: {err: 'catch in startSession'}}))
    })
};

sessionController.verifySession = (req, res, next) => {
  console.log(req.cookies.ssid)
  
  const currDate = new Date();
  // convert date to MM/DD/YYYY HH:MM:SS
  const currDateStr =
  ("00" + (currDate.getMonth() + 1)).slice(-2) + "/" +
  ("00" + currDate.getDate()).slice(-2) + "/" +
  currDate.getFullYear() + " " +
  ("00" + currDate.getHours()).slice(-2) + ":" +
  ("00" + currDate.getMinutes()).slice(-2) + ":" +
  ("00" + currDate.getSeconds()).slice(-2);

  const expireDays = 1;
  const text = `SELECT * FROM sessions
  WHERE session_id = '${req.cookies.ssid}'
  AND DATE_PART('day', '${currDateStr}'::timestamp - created_at::timestamp) <= ${expireDays}`
  
  db
    .query(text)
    .then(data => {
      console.log('DATA --> ', data);
      if (data.rows.length === 0) {
        return res.status(500)
      }
      else {

        return next();
      }
    })
    .catch(err => next({log: err, message: {err: 'catch in verifySession'}}))
}

module.exports = sessionController;