import React from 'react';
import '../stylesheets/styles.css'
import {Link} from 'react-router-dom'


function Nav()  {

    return (
        <nav>
            <h1>Logo</h1> 
            <ul className='nav-links'>
                <Link to="/login">
                  <li>Login</li>
                </Link>
                <Link to="/mytrips">
                  <li>My Trips</li>
                </Link>  
                <Link to="/about">
                  <li>About</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;