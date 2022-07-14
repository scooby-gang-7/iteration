import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Input} from '@mui/material';
import axios from 'axios';
import SignUp from './Signup';
import '../stylesheets/styles.css';

function Login(props) {
  const { setUserInfo, userInfo } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitlogin = (e) => {
    // to prevent rerender
    e.preventDefault();
    fetch('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setUserInfo(data);
        //if valid user/password --> route to MyTrips page
        window.localStorage.setItem(
          'session_id',
          JSON.stringify(data.session_id)
        );
        console.log('data passed into setUserInfo -->', data);
        navigate('/mytrips', { replace: true });
      })
      .catch((e) => {
        //pop-up error handling instance
        toast.error('Invalid email or password.');
        console.log({ e });
      });
  };

  return (
    <div id='login-parent'>
          <h3>Login</h3>
      <FormControl>
        <form action='#' class='loginBox'>
        <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              type='text'
              placeholder='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          
         <InputLabel htmlFor='password'>Password </InputLabel>
            
            <Input
              type='password'
              placeholder='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          
          
          <Link to='/signup'>
            <button id='btn-signup' className='signUpButton'>
              Sign Up
            </button>
          </Link>
          <button id='btn-login' className='' onClick={handleSubmitlogin}>
            Login
          </button>
          
        </form>
      </FormControl>
      
    </div>
  );
}

export default Login;
