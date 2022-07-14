import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';




function NavBar ({userInfo, setUserInfo}) {
//use useState to create a variable to holds if the the user is logged In-- already exists in App.jsx --> setUserInfo and userInfo

// const [userInfo, setUserInfo] = useState({user_id: null});
// let links;
// let linkLabel;
// useEffect(()=>{
  
//  if (userInfo.user_id) { 
//       links =  <Link to='/'>
//           <li>Sign Out</li>
//         </Link>
//  } else {
//     links =   <Link to='/'>
//           <li>Sign In</li>
//         </Link>
//  }

//  console.log('links in useEffect -->', links)

// }, [userInfo.user_id])
//if there is userInfo, then they are logged in, so change the navbar to show the <li>Sign Out</li>
    return (
        <nav id= 'navBar'>

        <h1>Travel Pal</h1>
        <ul className='nav-links'>

       
       {userInfo.user_id ? 
       <Link to='/'>
          <li>Sign Out</li>
        </Link> : <Link to='/'>
          <li>Sign In</li>
        </Link>}

       <li>links go here</li>
        </ul>

            
        </nav>



    );
}

export default NavBar; 