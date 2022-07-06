const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.sessionId, {httpOnly : true});
  return next();
};

module.exports = cookieController;