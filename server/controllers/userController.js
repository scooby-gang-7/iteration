const db = require('../models/userTripModels');
const bcrypt = require('bcryptjs');

//bcrypt
const SALT_WORK_FACTOR = 10;

const userController = {};

userController.getAllUsers = (req, res, next) => {
    //get all users
    const queryText = 'SELECT * FROM users';
    db
    .query(queryText)
    .then(data => {
        console.log(data);
        res.locals.data = data.rows;
        next();
    })
    .catch(err => {
        if (err) throw err;
    });
};


userController.createUser = (req, res, next) => {
    const { name_first, name_last, email, password } = req.body;
    const date = new Date();
    const dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + "/" +
      date.getFullYear() + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);

    bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next(err);
        // password = hash;
        // console.log(password);
        const queryText = `INSERT INTO users (email, name_first, name_last, password, created_at)
         VALUES ('${email}', '${name_first}', '${name_last}', '${hash}', '${dateStr}') RETURNING *;`;
        
        db
        .query(queryText)
        .then(data => {
            console.log(data);
            res.locals.data = data.rows[0];
            return next();
        })
        .catch(err => {
            return next({log: err, message: {err: 'catch in createUser'}});
        })
    })
}

userController.verifyUser = (req, res, next) => {
    const { email, password } = req.body;
    const queryText = `SELECT * FROM users
         WHERE email='${email}';`;
    db
        .query(queryText)
        .then(data => {
            if (data.rows.length == 0) {
                // res.locals.data = {message: 'user does not exist'}; //to do throw error
                return next(createErr({
                    method:'verifyUser',
                    type: 'user does not exist',
                    err: 'User does not exist'
                }));
            }
            else {
                bcrypt.compare(password, data.rows[0].password)
                .then(result => {
                    if(!result) {
                        // res.locals.data = {message: 'wrong passord'}; //todo throw error
                        return next(createErr({
                            method:'verifyUser',
                            type: 'wrong password',
                            err: 'Wrong password'
                        }));
                    } else {
                        res.locals.data = data.rows[0];
                        return next();
                    }
                })
            }
        })
        .catch(err => {
            return next({log: err, message: {err: 'catch in verifyUser'}});
        })
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
}


module.exports = userController;