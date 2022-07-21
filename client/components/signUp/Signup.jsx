import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Container, Paper, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';




const Signup = ({ setUserInfo, userInfo }) => {
  const [name_first, setFirstName] = useState('');
  const [name_last, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' };
  const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });
  
  const handleSubmitSignup = (e) => {
    e.preventDefault();
    fetch('auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name_first,
        name_last,
        email,
        password,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setUserInfo(data);
        window.localStorage.setItem(
          'session_id',
          JSON.stringify(data.session_id)
        );
        toast.success('Signup successful!');
        navigate('/mytrips', { replace: true });
        console.log('FRONTEND DATA -->', data);
      })
      .catch((e) => {
        //pop-up error handling instance
        toast.error('Signup unsuccessful');
        console.log({ e });
      });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  return (
    <div id='signup-parent'>
<Typography component='h1' variant='h5'>
Create Travel Account
</Typography>




{/* FIRST NAME INPUT */}
<FormControl
              sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
              variant='outlined'
            >
              <InputLabel htmlFor='outlined-adornment-firstname'>First Name</InputLabel>
              <OutlinedInput
                id='outlined-adornment-firstname'
                autoComplete='off'
                inputProps={{ style: inputStyle }}
                value={name_first}
                onChange={(e) => setFirstName(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                 
                  </InputAdornment>
                }
                label='name_first'
              />
            </FormControl>


{/* LAST NAME INPUT  */}
<FormControl
              sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
              variant='outlined'
            >
              <InputLabel htmlFor='outlined-adornment-lastname'>Last Name</InputLabel>
              <OutlinedInput
                id='outlined-adornment-lastname'
                autoComplete='off'
                inputProps={{ style: inputStyle }}
                value={name_last}
                onChange={(e) => setLastName(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                  </InputAdornment>
                }
                label='name_last'
              />
            </FormControl>

{/* EMAIL INPUT */}
<FormControl
              sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
              variant='outlined'
            >
              <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
              <OutlinedInput
                id='outlined-adornment-email'
                autoComplete='off'
                inputProps={{ style: inputStyle }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                  </InputAdornment>
                }
                label='email'
              />
            </FormControl>

{/* PASSWORD INPUT */}

<FormControl
              sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
              variant='outlined'
            >
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                autoComplete='off'
                type={values.showPassword ? 'text' : 'password'}
                inputProps={{ style: inputStyle }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='password'
              />
            </FormControl>

            <Button
              sx={{ m: 1 }}
              variant='contained'
              color='primary'
              type='submit'
              className='button-block'
              onClick={handleSubmitSignup}
            >
              Sign Up
            </Button>

    </div> 
  );
}

export default Signup;
