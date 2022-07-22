import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
// import ChatMessage from './ChatMessage.jsx';
/*

need to post to DB, pull from DB (when?)

need to emit from socket on change for any field

need to receive emits from server about changes to fields

need to update state with (array?) of input values

need to conditionally disable input boxes when another user is using it
need to emit from socket that an input has been selected (and is now occupied)
need to emit when it is deselected (and no longer occupied)
need to render occupied (by other users) inputs as disabled

SQL columns in ENTRIES table:
_id, trip_id, value

problem : new users haven't received info about occupied fields
solution : on connection, emit from server "query" event (hopefully to a given room) to get back occupied fields


what fixed our problem of screen not displaying:
- changing from default value to value
- passing callback to server to update state

we use a grid to auto-force 2 columns

only thing left is to update the DB! and pull from it to begin with
and add the ability to add/delete rows (2 input records at a time)
-- adding should create 2 new records in the DB
-- deleting is trickier. I think put a "if _id is even" condition in the HTML and generate a delete button if it is, and give it an id of "delete-${_id}"
---- then if delete is pressed we can send a query to DB that deletes _id and _id + 1.
-- would need to add new socket events, etc.
*/

const BulletinBoard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [curSocket, setCurSocket] = useState(null);
  const [userId, setUserId] = useState(2);
  const [tripId, setTripId] = useState(11);
  // const [message, setMessage] = useState('');
  // const [messageList, setMessageList] = useState([]);
  const [allInputs, setAllInputs] = useState({
    1: { _id: '1', value: 'hello!' },
    2: { _id: '2', value: 'hi :)' },
    3: { _id: '3', value: '' },
    4: { _id: '4', value: 'yoo' },
  });
  const [occupiedFields, setOccupiedFields] = useState({});

  useEffect(() => {
    // fetch input values from entries table
    // axios
    //   .post('api/getentries', { roomId: props.tripId })
    //   .then((res) => {
    //     // after fetching, update message list
    //     console.log(res.data);
    //     setMessageList(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // set up socket
    console.log('installing socket io');
    const socket = io(`http://localhost:${3000}`);
    setCurSocket(socket);

    socket.on('connect', () => {
      console.log('socket is connected!', socket.id);
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('socket is disconnected!');
    });
    // seems like this acts as a onComponentUnmount
    return () => {
      socket.close();
    };
  }, []);

  // on connection, set listeners and join a room
  useEffect(() => {
    console.log('state will be:', allInputs);
    if (isConnected) {
      // ask the server to put you in a room
      curSocket.emit('join-room', tripId, 'bulletin');
      console.log('-------------------------------------------------------==');
    }
  }, [isConnected]);

  // useEffect(() => {
  //   console.log('state changed!');
  //   console.log(allInputs);
  // }, [allInputs]);

  const onFocusChange = (e, type) => {
    const affectedInput = { _id: e.target.id, userId };
    curSocket.emit(
      'send-occupyChange',
      tripId,
      affectedInput,
      // callback to update state after successful DB update
      (objFromSrvr) => {
        const tempObj = { ...allInputs };
        tempObj[objFromSrvr._id] = objFromSrvr;
        console.log(tempObj);
        setAllInputs(tempObj);
      }
    );
  };

  const onInputUpdate = (e) => {
    console.log('input updated');
    const updatedPair = { _id: e.target.id, value: e.target.value };
    console.log(updatedPair);
    // send msg
    curSocket.emit(
      'send-update',
      tripId,
      updatedPair,
      // callback to update state after successful DB update
      (objFromSrvr) => {
        const tempObj = { ...allInputs };
        tempObj[objFromSrvr._id] = objFromSrvr;
        // console.log(tempObj);
        setAllInputs(tempObj);
      }
    );
  };

  // THINGS THAT UPDATE STATE MUST NOT BE IN USEEFFECTS
  // seems they are read not as a function definition, but executed and keep vars in memory (idk man)
  if (isConnected) {
    // listen to the server telling us about an input changing occupancy
    curSocket.on('receive-occupyChange', (affectedInput) => {
      const tempObj = { ...occupiedFields };
      // if field is occupied, we remove from occupied. else add
      console.log(affectedInput._id);
      if (tempObj[affectedInput._id]) {
        delete tempObj[affectedInput._id];
      } else {
        tempObj[affectedInput._id] = affectedInput.userId;
      }
      console.log(tempObj);
      setOccupiedFields(tempObj);
    });
    // listen to the server telling us an input has been updated
    curSocket.on('receive-update', (returnedPair) => {
      console.log('receiving update from server!');
      // console.log(returnedPair);
      const tempObj = { ...allInputs };
      tempObj[returnedPair._id] = returnedPair;
      setAllInputs(tempObj);
    });
  }

  return (
    <div>
      <label>userId simulate here:</label>
      <input
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      ></input>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          textAlign: 'center',
        }}
      >
        <div>Key</div>
        <div>Value</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {Object.values(allInputs).map((obj) => {
          console.log(userId, occupiedFields[obj._id]);
          console.log(obj.value, obj._id);
          return (
            <input
              disabled={
                occupiedFields[obj._id] && occupiedFields[obj._id] !== userId
              }
              value={obj.value}
              onChange={(e) => {
                onInputUpdate(e);
              }}
              onFocus={(e) => {
                onFocusChange(e, 'selected');
              }}
              onBlur={(e) => {
                onFocusChange(e, 'deselected');
              }}
              type='text'
              id={obj._id}
            ></input>
          );
        })}
      </div>
    </div>
  );
};

export default BulletinBoard;
