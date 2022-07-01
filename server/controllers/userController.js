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
         VALUES ('${email}', '${name_first}', '${name_last}', '${hash}') RETURNING *;`;
        
        db
        .query(queryText)
        .then(data => {
            console.log(data);
            res.locals.data = data.rows;
            return next();
        })
        .catch(err => {
            if (err) throw err;
        })
    })
}


module.exports = userController;