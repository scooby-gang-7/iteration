import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
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
      </AppBar>
    </Box>
  );
}
