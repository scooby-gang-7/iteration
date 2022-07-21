import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

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
        navigate('/', { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <nav id='navBar'>
      <h1>Travel Pal</h1>
      <ul className='nav-links'>
        {window.location.pathname === '/' ? (
          <Link to='/signup'>
            <li>Sign Up</li>
          </Link>
        ) : window.location.pathname === '/signup' ? (
          <Link to='/'>
            <li>Log In</li>
          </Link>
        ) : (
          <>
            <Link to='/mytrips'>
              <li>My Trips</li>
            </Link>
            <li id='signout' onClick={handleSignOut}>
              Signout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
