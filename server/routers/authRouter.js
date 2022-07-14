// Reqs
const path = require('path');
// Prepare Router
const express = require('express');
const router = express.Router();
// Import controllers
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

router.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).send(res.locals.sessionInfo);
  }
);

router.post('/signout', sessionController.endSession, (req, res) => {
  res.status(200).send(res.locals.sessionInfo);
});

//testing for verifyUser
router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).send(res.locals.sessionInfo);
  }
);

//fetch with session_id to get user_id
router.get('/session', sessionController.verifySession, (req, res) => {
  res.status(200).send(res.locals.sessionInfo);
});

// Export router
module.exports = router;
