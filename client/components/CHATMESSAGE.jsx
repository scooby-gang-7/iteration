import React, { useState, useEffect } from 'react';
import '../stylesheets/styles.css';

const CHATMESSAGE = (props) => {
  console.log(props);

  const bubblePadding = '10px';
  const bubbleMargin = '15px';
  console.log(props.user === props.sender, props.user, props.sender);
  const bubbleColor = props.user === props.sender ? 'rgb(255,150,100)' : 'gray';
  const bubbleJustify = props.user === props.sender ? 'flex-end' : 'flex-start';
  const nameColor = props.user === props.sender ? 'white' : 'white';
  const msgColor = props.user === props.sender ? 'white' : 'white';

  return (
    <div
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
            borderRadius: '20px',
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
            <div>{`${props.sender}`}</div>
          </div>
          <div
            className='msg-main'
            style={{ padding: '10px', paddingLeft: '20px' }}
          >
            <div style={{ color: msgColor, fontWeight: '600' }}>
              {props.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CHATMESSAGE;
