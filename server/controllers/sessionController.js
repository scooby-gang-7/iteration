const db = require('../models/userTripModels');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 5;

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  const user_id = toString(res.locals.data.user_id);
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

  // hash the user's ID to use as session ID
  bcrypt.hash(user_id, SALT_WORK_FACTOR, (err, hash) => {
    if (err)
      return next({
        log: err,
        message: { err: 'err in startSession bcrypt.hash' },
      });
    console.log('hash --> ', hash);
    console.log('date --> ', dateStr);
    res.locals.sessionId = hash;

    // try to insert new session, if session ID already exists then updated timestamp
    const text = `
      INSERT INTO sessions (session_id, created_at, user_id) 
      VALUES($1, $2, $3)
      -- ON CONFLICT 
      -- DO UPDATE SET created_at = ($2)
      RETURNING *;`;
    const values = [hash, dateStr, res.locals.data.user_id]
    db.query(text, values)
      .then((data) => {
        console.log('DATA --> ', data);
        res.locals.sessionInfo = data.rows[0];
        return next();
      })
      .catch((err) =>
        next({ log: err, message: { err: 'catch in startSession' } })
      );
  });
};

sessionController.verifySession = (req, res, next) => {
  const session_id = req.query.session_id;
  const currDate = new Date();
  // convert date to MM/DD/YYYY HH:MM:SS
  const currDateStr =
    ('00' + (currDate.getMonth() + 1)).slice(-2) +
    '/' +
    ('00' + currDate.getDate()).slice(-2) +
    '/' +
    currDate.getFullYear() +
    ' ' +
    ('00' + currDate.getHours()).slice(-2) +
    ':' +
    ('00' + currDate.getMinutes()).slice(-2) +
    ':' +
    ('00' + currDate.getSeconds()).slice(-2);

  const expireDays = 1;
  const values = [session_id, currDateStr, expireDays];
  const text = `
    SELECT * FROM sessions
    WHERE session_id = ($1)
    AND DATE_PART('day', ($2)::timestamp - created_at::timestamp) <= ($3)`;

  db.query(text, values)
    .then((data) => {
      console.log('DATA --> ', data);
      if (data.rows.length === 0) {
        return res.status(500);
      } else {
        res.locals.sessionInfo = data.rows[0];
        return next();
      }
    })
    .catch((err) =>
      next({ log: err, message: { err: 'catch in verifySession' } })
    );
};

sessionController.endSession = (req, res, next) => {
  const { session_id } = req.body;
  const values = [session_id];
  const text = `
    DELETE FROM sessions 
    WHERE session_id = ($1)
    RETURNING *`;

  db.query(text, values)
    .then((data) => {
      res.locals.sessionInfo = data.rows[0];
      return next();
    })
    .catch((err) =>
      next({ log: err, message: { err: 'catch in endSession' } })
    );
};

module.exports = sessionController;
