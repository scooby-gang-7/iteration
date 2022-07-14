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
    <>
    <div id='login-parent'>
               <form action='#' className='loginBox'>
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
        <Link to='/signup'>
          <button id='btn-signup' className='signUpButton'>
            Sign Up
          </button>
        </Link>
        <button id='btn-login' className='' onClick={handleSubmitlogin}>
          Login
        </button>
        <br />
      </form>
      <br />
    </div>
      

      <Paper
variant="elevation"
elevation={2}
className="login-background"
>
<Grid item>
<Typography component="h1" variant="h5">
Sign in
</Typography>
</Grid>
<Grid item>
<form onSubmit={this.handleSubmit}>
<Grid container direction="column" spacing={2}>
<Grid item>
<TextField
type="email"
placeholder="Email"
fullWidth
name="username"
variant="outlined"
value={this.state.username}
onChange={(event) =>
this.setState({
[event.target.name]: event.target.value,
})
}
required
autoFocus
/>
</Grid>
<Grid item>
<TextField
type="password"
placeholder="Password"
fullWidth
name="password"
variant="outlined"
value={this.state.password}
onChange={(event) =>
this.setState({
[event.target.name]: event.target.value,
})
}
required
/>
</Grid>
<Grid item>
<Button
variant="contained"
color="primary"
type="submit"
className="button-block"
>
Submit
</Button>
</Grid>
</Grid>
</form>
</Grid>
<Grid item>
<Link href="#" variant="body2">
Forgot Password?
</Link>
</Grid>
</Paper>




    </div>
    </>
  );
}

export default Login;
