import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ChatMessage from './ChatMessage.jsx';
import { Box, Button, Card, Input, TextField, Typography } from '@mui/material';
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

const ChatRoom = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [curSocket, setCurSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  // const [firstName, setFirstName] = useState('');

  // on update of the messagelist, move scrollbar to bottom
  useEffect(() => {
    const el = document.querySelector('#messagesContainer');
    el.scrollTop = el.scrollHeight;
  }, [messageList]);

  useEffect(() => {
    // fetch conversation from messages table - dummy data right now
    axios
      .post('api/getmessages', { roomId: props.tripId })
      .then((res) => {
        // after fetching, update message list
        console.log(res.data);
        setMessageList(res.data);
      })
      .catch((err) => {
        console.log(err);
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

  // on connection, set listeners and join a room
  useEffect(() => {
    if (isConnected) {
      // ask the server to put you in a room
      curSocket.emit('join-room', props.tripId);
    }
  }, [isConnected]);

  if (isConnected) {
    curSocket.on('receive-message', (msg) => {
      console.log(' youve received a message!');
      setMessageList([...messageList, msg]);
    });
  }
  const sendMessage = () => {
    // send msg
    console.log('fn', props.firstName);
    curSocket.emit(
      'send-message',
      message,
      props.tripId,
      props.firstName,
      (objFromSrvr) => {
        setMessageList([...messageList, objFromSrvr]);
      }
    );
    setMessage('');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        verticalAlign: 'center',
        bgcolor: 'white',
        borderRadius: '4px',
        padding: '18px',
        height: '95%',
        margin: '20px',
      }}
    >
      <Box
        id='messagesContainer'
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: '50px',
          width: '100%',
          overflow: 'auto',
          border: '1px solid lightgrey',
          borderRadius: '4px',
        }}
      >
        {messageList.length ? (
          messageList.map((msg) => (
            <ChatMessage
              user={String(props.firstName)}
              key={msg.message_id}
              message_id={msg.message_id}
              sender={String(msg.sender)}
              message={msg.message}
              timestamp={msg.timestamp}
            />
          ))
        ) : (
          <Typography>No messages. Say something already!</Typography>
        )}
      </Box>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='outlined-multiline-static'
          required
          multiline
          label='What do want to share?'
          rows={2}
          defaultValue="What's on your mind?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
          style={{ width: '100%' }}
        />
        <Button
          variant='contained'
          sx={{ width: '50%' }}
          onClick={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          Send Message
        </Button>
      </Box>
    </Card>
  );
};

export default ChatRoom;
