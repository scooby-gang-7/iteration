import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/styles.css';
import io from 'socket.io-client';

/*

HOW TO USE

open up multiple clients (tabs, windows, etc)
subscribe to a room (any string) with the Join Room button
do this for all the clients you want to be grouped together
now send a message from one! any that weren't grouped
should not see the message :)

Missing:
- using tripId for automatic room number
- styling
- messages table
- fetch to update messages table
- fetch to pull from messages table
- backend middleware to query the messages table

*/

const CHATROOM = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [curSocket, setCurSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // we don't need this in state
  // just need to pass down the tripId as props
  // this is used to specify what "chat room" to send to
  const [room, setRoom] = useState('');

  useEffect(() => {
    // fetch conversation from messages table - dummy data right now
    axios.post('/getmessages', { roomId: 3 }).then((res) => {
      console.log(res.data);
      setMessageList(res.data);
    });
    setMessageList(['kyle', 'is', 'great!']);

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

  // seems the messagelist var needs updated
  // when I had this in useeffect, messagelist was only ever
  // what it was initialized as ([])
  if (isConnected) {
    curSocket.emit('join-room', 3);
    curSocket.on('receive-message', (msg) => {
      console.log('message received!!!!');
      // console.log('loggin it!');
      // console.log(messageList);
      console.log('receiving msg --------------------------');
      console.log(msg);
      setMessageList([...messageList, msg]);
    });
    console.log('finished setup');
  }
  const sendMessage = () => {
    // simulate vars
    const firstName = 'Kyle :)';
    const tripId = 3;

    // send msg
    setMessageList([...messageList, { sender: firstName, message, tripId }]);
    console.log({ sender: firstName, message, tripId });
    curSocket.emit('send-message', message, tripId, 'Kyle :)');
  };

  const joinRoom = () => {
    // console.log(room);
    curSocket.emit('join-room', room);
  };

  return (
    <div id='login-parent'>
      <form action='#' className='loginBox'>
        <h3>CHAT ROOM BABYYY</h3>

        <label>Messages: </label>
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingLeft: '30px',
          }}
        >
          {messageList.length ? (
            messageList.map((msg) => (
              <div key={msg.message_id}>{msg.message}</div>
            ))
          ) : (
            <></>
          )}
        </div>
        <label>Manually join a room: </label>
        <input value={room} onChange={(e) => setRoom(e.target.value)} />
        <br />
        <br />
        <label>Message: </label>
        <br />
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <br />
        <br />
        <button
          id='btn-login'
          className=''
          onClick={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          Send Message
        </button>
        <button
          id='roomjoin'
          className=''
          onClick={(e) => {
            e.preventDefault();
            joinRoom();
          }}
        >
          Join room
        </button>
        <br />
      </form>
      <br />
    </div>
  );
};

export default CHATROOM;
//
