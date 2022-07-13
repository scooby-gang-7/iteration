import React, { useState, useEffect} from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../stylesheets/styles.css'
import SignUp from './Signup'
import {
  Link,
  useNavigate
} from 'react-router-dom';



function Login(props) {

  const {setUserInfo, userInfo} = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleSubmitlogin = (e) => {
    // to prevent rerender
    e.preventDefault();
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
      .then(data => {
        data.json()})
      .then(data => {
        setUserInfo(data);
        //if valid user/password --> route to MyTrips page 
        window.localStorage.setItem('session_id', JSON.stringify(data.session_id));
        console.log('data passed into setUserInfo -->', data);
        navigate('/mytrips', { replace: true});
      })
      .catch((e) => {
        //pop-up error handling instance
        toast.error('Invalid email or password.');
        console.log({e});
      })

  }
  
  return (
    <div id="login-parent">
      <form action='#' class="loginBox">
        <h3>Login</h3>
        <div className=''>
          <label>Email  </label><br />
          <input type='text' placeholder='email' name='email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className=''>
          <br />
          <label>Password  </label><br />
          <input type='password' placeholder='password' name='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <br />
        <Link to="/signup">
          <button id="btn-signup" className='signUpButton'>Sign Up</button>
        </Link>
        <button id="btn-login" className='' onClick={handleSubmitlogin}>Login</button>
        <br />      
      </form>
      <br />
    </div>
  )
};

export default Login;