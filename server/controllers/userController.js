const db = require('../models/userTripModels');

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

module.exports = userController;