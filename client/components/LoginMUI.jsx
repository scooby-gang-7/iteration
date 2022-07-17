import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Paper, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { textAlign } from '@mui/system';
import Signup from './Signup';

export default function LoginMUI({ setUserInfo, userInfo }) {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' };
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <div>
      <Paper elevation={3} sx={{ m: 1, p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            textAlign: 'center',
            m: '40',
          }}
        >
          <div>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <FormControl sx={{ m: 1, width: '30ch' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
              <OutlinedInput
                id='outlined-adornment-email'
                autoComplete='off'
                inputProps={{ style: inputStyle }}
                value={values.email}
                onChange={(e) => setEmail(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <AccountCircle edge='end'></AccountCircle>
                  </InputAdornment>
                }
                label='email'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '30ch' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                autoComplete='off'
                inputProps={{ style: inputStyle }}
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
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
                label='Password'
              />
            </FormControl>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='button-block'
              onClick={handleSubmitLogin}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Paper>
      <Signup/>
    </div>
  );
}
