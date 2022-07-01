const db = require('../models/userTripModels');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
    const { data } = res.locals.data
    let text;
    // check to see if there is already an active session
    text = `SELECT * FROM sessions s WHERE s.session_id = ${res.locals.idHash}`
    db
    .query(text)
    .then(data => {
        // if not, add new session
        if (data === null) {
            text = 'INSERT into sessions (session_id, created_at) VALUES ($1, $2) RETURNING *'
            const info = [res.locals.idHash, Date.now()]
            db
            .query(text, info)
            .then(data => {
              window.localStorage.setItem('SESSION', JSON.stringify(res.locals.idHash))
              res.locals.sessionInfo = data.rows;
              return next();
            })
            .catch(err => next({log: 'catch in startSession', message: {err: 'catch in startSession'}}))
        }
        else return next();
      })
      .catch(err => next({log: 'catch in startSession', message: {err: 'catch in startSession'}}))
};

module.exports = sessionController;