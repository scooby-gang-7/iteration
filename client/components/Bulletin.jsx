import React, { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { Card  } from '@mui/material';

import ChatroomContainer from './chatroom/ChatroomContainer.jsx';
import BulletinBoard from './BulletinBoard.jsx'

import BannerImg from '../assets/plan.png';



const Bulletin = (props) => {


  return (
  
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={BannerImg} width='900px' max-height={300} />
        <Card
          elevation={2}
          sx={{
            padding: '30px',
          }}
        >
          <BulletinBoard />
        </Card>
       
      {/* <div
        className='drawer-preview'
        style={{
          // width: 'min-content',
          display: 'block',
          position: 'sticky',
          bottom: '30px',
          right: 0,
          margin: '20px',
          float: 'right',
          backgroundColor: 'rgba(0,0,0,0.02)',
          borderRadius: '4px',
        }}
      >
        <ChatroomContainer
          className='chatroomContainer'
          userInfo={props.userInfo}
          tripId={id}
        />
        </div> */}
    </Container>
  );
};

export default Bulletin;
