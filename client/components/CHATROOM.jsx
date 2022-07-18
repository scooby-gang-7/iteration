import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/styles.css';
import io from 'socket.io-client';
import CHATMESSAGE from './CHATMESSAGE.jsx';
/*

HOW TO USE

open up multiple clients (tabs, windows, etc)
activate a common trip for a couple of the clients
do this for all the clients you want to be grouped together
now send a message from one! any that weren't grouped
should not see the message :)

To do:
✔ using tripId for automatic room number
✔ styling
✔ messages table
✔ fetch to update messages table
✔ fetch to pull from messages table
✔ backend middleware to query the messages table

*/

const CHATROOM = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [curSocket, setCurSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const [firstName, setFirstName] = useState('');
  // const firstName = 'Kyle =)';
  const tripId = 1;

  // we don't need this in state
  // just need to pass down the tripId as props
  // this is used to specify what "chat room" to send to
  const [room, setRoom] = useState('');

  // on update of the messagelist, move scrollbar to bottom
  useEffect(() => {
    const el = document.querySelector('#messagesContainer');
    el.scrollTop = el.scrollHeight;
  }, [messageList]);

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
      console.log(' youve received a message!');
      setMessageList([...messageList, msg]);
    });
  }
  const sendMessage = () => {
    // send msg
    console.log('fn', firstName);
    curSocket.emit(
      'send-message',
      message,
      tripId,
      firstName,
      (objFromSrvr) => {
        setMessageList([...messageList, objFromSrvr]);
      }
    );
    setMessage('');
  };

  const joinRoom = () => {
    curSocket.emit('join-room', tripId);
  };

  return (
    <div
      id='login-parent'
      style={{ margin: '-50px', width: '150%', textAlign: 'left' }}
    >
      <form action='#' className='loginBox'>
        <h3>CHAT ROOM BABYYY</h3>
        <div
          id='messagesContainer'
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            minHeight: '50px',
            maxHeight: '350px',
            width: '100%',
            overflowY: 'scroll',
          }}
        >
          {messageList.length ? (
            messageList.map((msg) => (
              <CHATMESSAGE
                user={firstName}
                key={msg.message_id}
                message_id={msg.message_id}
                sender={msg.sender}
                message={msg.message}
                timestamp={msg.timestamp}
              />
            ))
          ) : (
            <div>No messages. Say something already!</div>
          )}
        </div>
        <br />
        <label>Message: </label>
        <textarea
          placeholder='Type your message here...'
          style={{ width: '90%', minHeight: '50px' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <br />
        <label>Sender: </label>
        <br />
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
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
