import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import '../stylesheets/styles.css'
import SignUp from './Signup'
import {
  Link,
  useNavigate
} from 'react-router-dom';



function Login({setUserInfo, userInfo}) {

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
      .then(data => data.json())
      .then(data => {
        setUserInfo(data);
        //if valid user/password --> route to MyTrips page
        navigate('/mytrips', { replace: true});
        console.log(data);
      }).catch((e) => {
        //pop-up error handling instance
        console.log(e);
        toast.error('Invalid email or password.');
        console.log({e});
      })

  }
  
  return (
    <div id="login-parent">
      <form action='#'>
        <h3>Login</h3>
        <div className=''>
          <label>Email Address:  </label>
          <input type='text' placeholder='email' name='email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className=''>
          <label>Password:  </label>
          <input type='password' placeholder='password' name='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className='' onClick={handleSubmitlogin}>Login</button>
      </form>
      <br />
      <Link to="/signup">
      <button className='signUpButton'>Sign Up</button>
      </Link>
    </div>
  )
};

export default Login;