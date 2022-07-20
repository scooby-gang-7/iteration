const db = require('../models/userTripModels');
const bcrypt = require('bcryptjs');

//bcrypt
const SALT_WORK_FACTOR = 10;

const userController = {};

userController.getAllUsers = (req, res, next) => {
  //get all users
  const queryText = 'SELECT * FROM users';
  db.query(queryText)
    .then((data) => {
      console.log(data);
      res.locals.data = data.rows;
      next();
    })
    .catch((err) => {
      if (err) throw err;
    });
};

userController.createUser = (req, res, next) => {
  // console.log('in create user');
  const { name_first, name_last, email, password } = req.body;
  if (name_first == '' || name_last == '' || email == '' || password == '') {
    return next(
      createErr({
        method: 'createUser',
        type: 'missing info',
        err: 'Missing Info',
      })
    );
  } else {
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

    bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
      if (err) return next(err);
      // password = hash;
      // console.log(password);
      const queryText = `
        INSERT INTO users(email, name_first, name_last, password)
        VALUES($1, $2, $3, $4) 
        RETURNING *;`;
      
      const values = [email, name_first, name_last, hash]
      db.query(queryText, values)
        .then((data) => {
          // console.log(data);
          res.locals.data = data.rows[0];
          return next();
        })
        .catch((err) => {
          return next({ log: err, message: { err: 'catch in createUser' } });
        });
    });
  }
};

userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;
  const values = [ email ]
  const queryText = `
    SELECT * FROM users
    WHERE email=($1);`;
  
  db.query(queryText, values)
    .then((data) => {
      if (data.rows.length == 0) {
        // res.locals.data = {message: 'user does not exist'}; //to do throw error
        return next(
          createErr({
            method: 'verifyUser',
            type: 'user does not exist',
            err: 'User does not exist',
          })
        );
      } else {
        bcrypt.compare(password, data.rows[0].password).then((result) => {
          if (!result) {
            // res.locals.data = {message: 'wrong passord'}; //todo throw error
            return next(
              createErr({
                method: 'verifyUser',
                type: 'wrong password',
                err: 'Wrong password',
              })
            );
          } else {
            res.locals.data = data.rows[0];
            return next();
          }
        });
      }
    })
    .catch((err) => {
      return next({ log: err, message: { err: 'catch in verifyUser' } });
    });
};

//delete user (testing purposes)
userController.deleteUser = (req, res, next) => {
  const { email } = req.body;
  const values = [ email ]
  const queryText = `DELETE FROM users
  WHERE email=($1) *`

  db.query(queryText)
    .then((data) => {
      if (data.rows.length == 0) {
        // res.locals.data = {message: 'user does not exist'}; //to do throw error
        return next(
          createErr({
            method: 'deletePlace',
            type: 'user does not exist',
            err: 'user does not exist',
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



//Error Creator
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
  };
};

module.exports = userController;
