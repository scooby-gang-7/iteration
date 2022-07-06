const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  //add a expiration to the cookie
  res.cookie('ssid', res.locals.sessionId, {expires: new Date(Date.now() + 900000), httpOnly : true});
  return next();
};

module.exports = cookieController;