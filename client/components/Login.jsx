import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, Input, Grid, Paper, TextField, Typography } from '@mui/material';
import SignUp from './Signup';
import '../stylesheets/styles.css';

 const Login = (props) =>{
  const { setUserInfo, userInfo } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
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
    <>
      <div id='login-parent'>
        {/* <form action='#' className='loginBox'>
          <h3>Login</h3>
          <div className=''>
            <label>Email </label>
            <br />
            <input
              type='text'
              placeholder='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=''>
            <br />
            <label>Password </label>
            <br />
            <input
              type='password'
              placeholder='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          
          <button id='btn-login' className='' onClick={handleSubmitLogin}>
            Login
          </button>
          <br />
        </form>
        <br /> */}

        <Paper variant='elevation' elevation={2} className='login-background'>
          <Grid item>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmitLogin}>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    type='email'
                    placeholder='Email'
                    fullWidth
                    name='email'
                    variant='outlined'
                    value={email}
                    onChange={(event) => setEmail}
                    required
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    type='password'
                    placeholder='Password'
                    fullWidth
                    name='password'
                    variant='outlined'
                    value={password}
                    onChange={(event) => setPassword(password)}
                    required
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    className='button-block'
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item>
            {/* <Link href='#' variant='body2'>
            Forgot Password?
          </Link> */}
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default Login;
