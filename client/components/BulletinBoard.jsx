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
_id, trip_id, key, value

problem : new users haven't received info about occupied fields
solution : on connection, emit from server "query" event (hopefully to a given room) to get back occupied fields

*/

const BulletinBoard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [curSocket, setCurSocket] = useState(null);
  const [userId, setUserId] = useState(2)
  const [tripId, setTripId] = useState(11)
  // const [message, setMessage] = useState('');
  // const [messageList, setMessageList] = useState([]);
  const [allInputs, setAllInputs] = useState({})
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
    
    // simulate fetch - receive _id, key, value
    const simulation = { 1: {_id : 1, value: ''}, 2: {_id : 2, value:''}, 3: {_id :3, value:'filled'}, 4: {_id :4, value:''}}
    setAllInputs(simulation)

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

  if (isConnected) {
      console.log(allInputs)
    curSocket.emit('join-room', tripId, 'bulletin');
    curSocket.on('receive-message', (msg) => {
      console.log(' youve received a message!');
      setMessageList([...messageList, msg]);
    });
    curSocket.on('occupy-check', () => {
      curSocket.emit('occupied-res', occupiedFields);
    })
    curSocket.on('occupy-change', )
    curSocket.on('receive-update', (returnedPair) => {
        console.log('receiving update from server!')
        console.log(returnedPair)
        const tempObj = {...allInputs}
        tempObj[returnedPair._id] = returnedPair
        console.log(tempObj)
        setAllInputs(tempObj)
    })
  }

  const onFocusChange = (e, type) => {
      console.log(e.target.id)
      console.log(type)
  }
  
  const onInputUpdate = (e) => {
      console.log('input updated')
      const updatedPair = {_id: e.target.id, value: e.target.value}
    // send msg
    curSocket.emit(
      'send-update', tripId, updatedPair,
      // callback to update state after successful DB update
      (objFromSrvr) => {
        setMessageList([...messageList, objFromSrvr]);
      }
    );
  };

  console.log(allInputs)
  return (
    <div style={{display:'flex'}}>
        {Object.values(allInputs).map((obj)=>{
            console.log(obj)
            console.log(obj.value, obj._id)
            return (<input defaultValue={obj.value} onChange={(e)=>{onInputUpdate(e)}} onFocus={(e)=>{onFocusChange(e,'selected')}} onBlur={(e)=>{onFocusChange(e,'deselected')}} type='text' id={obj._id}></input>)
        })
        }
    </div>
  );
};

export default BulletinBoard;