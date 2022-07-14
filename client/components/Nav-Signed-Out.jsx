import React from 'react';
import '../stylesheets/styles.css';
import { Link, Outlet } from 'react-router-dom';

function Nav() {
  return (
    <nav id='navBar'>
      <h1>Travel Pal</h1>
      <ul className='nav-links'>
        <Link to='/about'>
          <li>About</li>
        </Link>
        <Link to='/signup'>
          <li>Sign Up</li>
        </Link>
      </ul>
      {/* <Outlet /> */}
    </nav>
  );
}

export default Nav;
