const db = require('../models/userTripModels');

const socketIoController = {};

socketIoController.getMessages = async (req, res, next) => {
  // get roomId from cookies (for now just body)
  //   const roomId = req.cookies.tripId;
  const { roomId } = req.body;

  // make query to get chats
  const params = [roomId];
  const queryText = `
    SELECT message_id, sender, message, timestamp from messages
    WHERE trip_id = $1
    ORDER BY message_id
`;
  try {
    const result = await db.query(queryText, params);
    res.locals.chats = result.rows;
    return next();
  } catch (error) {
    return next(error);
  }
};

// socketIoController.addChat = async (req, res, next) => {
//   // get roomId from body
//   const { roomId, message, firstName } = req.body;

//   // make query to get chats
//   const params = [roomId, firstName, message];
//   const queryText = `
//       INSERT INTO messages (trip_id, sender, message)
//       VALUES ($1, $2, $3)
//   `;
//   const result = await db.query(queryText, params);

//   return next();
// };

module.exports = socketIoController;
