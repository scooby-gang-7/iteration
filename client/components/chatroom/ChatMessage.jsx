import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const ChatMessage = (props) => {
  const bubblePadding = '10px';
  const bubbleMargin = '15px';
  const bubbleColor = props.user === props.sender ? '#D4E5F2' : '#EFEFEF';
  const bubbleJustify = props.user === props.sender ? 'flex-end' : 'flex-start';
  const nameColor = props.user === props.sender ? 'black' : 'black';
  const msgColor = props.user === props.sender ? '#137083' : '#137083';

  return (
    <Box
      className='messageRow'
      key={props.message_id}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: bubbleJustify,
        width: '100%',
        color: 'gray',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          margin: bubbleMargin,
        }}
      >
        <div style={{ marginLeft: '0px' }}>{`${new Date(
          props.timestamp
        ).toLocaleString('en-US', {
          timeStyle: 'short',
          dateStyle: 'short',
        })}`}</div>
        <div
          className='bubble'
          style={{
            backgroundColor: bubbleColor,
            padding: bubblePadding,
            borderRadius: '8px',
          }}
        >
          <div
            className='msg-details'
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              color: nameColor,
            }}
          >
            <Typography>{`${props.sender}`}</Typography>
          </div>
          <div
            className='msg-main'
            style={{ padding: '4px', paddingLeft: '20px' }}
          >
            <Typography style={{ color: msgColor, fontWeight: '500' }}>
              {props.message}
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default ChatMessage;
