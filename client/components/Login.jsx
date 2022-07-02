import React, { useState } from "react";
import '../stylesheets/styles.css'
import SignUp from './Signup'
import {Link} from 'react-router-dom';



function Login(props) {

  const setUserInfo = props.setUserInfo;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitlogin = (e) => {
    //email, password --> server
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(data => data.json())
      .then(data => {
        setUserInfo({data});
        console.log(data);
      })
  }
  
  return (
    <div id="login-parent">
      <form action='#' method= 'post' onSubmit={console.log('hello')}>
        <h3>Login</h3>
        <div className=''>
          <label>Email Address:  </label>
          <input type='text' placeholder='email' name='email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className=''>
          <label>Password:  </label>
          <input type='password' placeholder='password' name='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <Link to="/mytrips">
          <button className='' onClick={handleSubmitlogin}>Login</button>
        </Link>
      </form>
      <br />
      <Link to="/signup">
      <button className='signUpButton'>Sign Up</button>
      </Link>
    </div>
  )
};

export default Login;