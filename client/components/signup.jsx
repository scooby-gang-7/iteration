import React from 'react';
import '../stylesheets/styles.css'
import { Link } from 'react-router-dom'; 

function Signup() {
    return (
        <div id='signup-parent'>
            <h1>Travel Pal</h1>
            <form action="#">
                <h3>Sign Up</h3>
                <div>
                    <label>First Name:  </label>
                    <input type="text" placeholder='first name' name='name_first' />
                </div>
                <div>
                    <label>Last Name:  </label>
                    <input type="text"  placeholder='last name' name='name_last'/>
                </div>
                <div>
                    <label>Email Address:  </label>
                    <input type="text" placeholder='email address' name='email' />
                </div>
                <div>
                    <label>Password:  </label>
                    <input type="password" placeholder='password' name='password'/>
                </div>
                <br />
                <Link to='/mytrips'>
                    <button className=''>Submit</button>
                </Link>
            </form>
        </div>
    )
}


export default Signup; 