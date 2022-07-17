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
  const [newMsgId, setNewMsgId] = useState(-1);

  const firstName = 'Kyle =)';
  const tripId = 1;

  // we don't need this in state
  // just need to pass down the tripId as props
  // this is used to specify what "chat room" to send to
  const [room, setRoom] = useState('');

  useEffect(() => {
    // fetch conversation from messages table - dummy data right now
    axios
      .post('/getmessages', { roomId: tripId })
      .then((res) => {
        // after fetching, update message list
        setMessageList(res.data);
      })
      .catch((err) => {
        console.log('error!!!!!!!', err);
      });

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
    curSocket.emit('join-room', tripId);
    curSocket.on('receive-message', (msg) => {
      setMessageList([...messageList, msg]);
    });
  }
  const sendMessage = () => {
    // send msg
    setMessageList([
      ...messageList,
      { firstName, message, timestamp: 'timeystampy', message_id: newMsgId },
    ]);
    setNewMsgId(newMsgId - 1);
    curSocket.emit('send-message', message, tripId, firstName);
    setMessage('');
  };

  const joinRoom = () => {
    curSocket.emit('join-room', tripId);
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
            messageList.map((msg) => {
              console.log(msg);
              return <div key={msg.message_id}>{msg.message}</div>;
            })
          ) : (
            <></>
          )}
        </div>
        {/* <label>Manually join a room: </label>
        <input value={room} onChange={(e) => setRoom(e.target.value)} /> */}
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
        {/* <button
          id='roomjoin'
          className=''
          onClick={(e) => {
            e.preventDefault();
            joinRoom();
          }}
        >
          Join room
        </button> */}
        <br />
      </form>
      <br />
    </div>
  );
};

export default CHATROOM;
