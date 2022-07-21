import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BannerImg from '../assets/1.png'

export default function ButtonAppBar({ userInfo, setUserInfo }) {
  const navigate = useNavigate();
  function handleSignOut(e) {
    const session_id = localStorage.getItem('session_id').replace(/['"]+/g, '');
    console.log('session_id --> ', session_id);
    const body = {
      session_id: session_id,
    };
    console.log('body --> ', body);

    fetch('auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      // .then(placesDetail => placesDetail.json())
      .then((placesDetails) => {
        setUserInfo({});
        localStorage.removeItem('session_id');
        navigate('/', { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <>
     <img src={BannerImg} width='900px' max-height={300}/>
    
   
      <Box>
        <img width='500px' max-height={300}/>
      </Box>
</>

      /* <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Travel Pal
          </Typography>
          {window.location.pathname === '/' ? (
            <Button
              color='inherit'
              onClick={navigate('/signup', { replace: true })}
            >
              Sign Up
            </Button>
          ) : window.location.pathname === '/signup' ? (
            <Button color='inherit' onClick={navigate('/', { replace: true })}>
              Log In
            </Button>
          ) : (
            <>
              <Button
                color='inherit'
                onClick={navigate('/mytrips', { replace: true })}
              >
                My Trips
              </Button>
              <Button color='inherit' onClick={handleSignOut}>
                Signout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar> */
    // </Box>
  );
}
