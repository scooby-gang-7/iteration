import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SignUpModal from './signUp/SignUpModal.jsx'


const NavBar = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  function handleSignOut(e) {
    const session_id = localStorage.getItem('session_id').replace(/['"]+/g, '');
    console.log('session_id --> ', session_id);
    const body = {
      session_id: session_id,
    };
    console.log('body --> ', body);

    fetch('api/auth/signout', {
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
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <nav id='navBar' >

        <h1>Travel Pal</h1>
        <ul className='nav-links'>

       
       {window.location.pathname === '/' ?
        <>
        
        </>
        : window.location.pathname === '/signup' ?
        <Link to='/'>
          <li>Sign In</li>
        </Link>
        :<>
       <Link to='/mytrips'>
          <li>My Trips</li>
        </Link>
        <li id='signout' test-data="navbar_signout"  onClick={handleSignOut}>
          Signout
        </li>
        </>
}
        </ul>
        </nav>
    );
}

export default NavBar; 
