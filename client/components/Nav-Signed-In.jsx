import React from 'react';
import '../stylesheets/styles.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Nav(props) {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = props;

  function handleClick(e) {
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
    <nav id='navBar'>
      <h1>Travel Pal</h1>
      <ul className='nav-links'>
        <Link to='/mytrips'>
          <li>My Trips</li>
        </Link>
        <Link to='/about'>
          <li>About</li>
        </Link>
        <li id='signout' onClick={handleClick}>
          Signout
        </li>
      </ul>
      <Outlet />
    </nav>
  );
}

export default Nav;
