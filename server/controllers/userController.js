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
    const created_at = Date.parse(Date.now());
    bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next(err);
        // password = hash;
        // console.log(password);
        const queryText = `INSERT INTO users (email, name_first, name_last, password)
         VALUES ('${email}', '${name_first}', '${name_last}', '${hash}')
         RETURNING user_id;`;
        
        db
        .query(queryText)
        .then(data => {
            console.log(data);
            res.locals.data = data.rows[0];
            return next();
        })
        .catch(err => {
            if (err) throw err;
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
            console.log(data);
            if (data.rows.length ==0) {
                res.locals.data = {message: 'user does not exit'}; //to do throw error
                return next();
            }
            else {
                bcrypt.compare(password, data.rows[0].password)
                .then(result => {
                    if(!result) {
                        res.locals.data = {message: 'wrong passord'}; //todo throw error
                        return next();
                    } else {
                        res.locals.data = data.rows[0];
                        return next();
                    }
                })
            }
        })
        .catch(err => {
            if (err) throw err;
        })
};


module.exports = userController;