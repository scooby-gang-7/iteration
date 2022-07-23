import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button, Container, Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function AddTrip(props) {
  const { userInfo } = props;

  //react hooks to save trip info
  const [trip_name, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState('');
  const [date_start, setDateStart] = useState('');
  const [date_end, setDateEnd] = useState('');
  const navigate = useNavigate();

  const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' };

  const handleSubmitAddTrip = (e) => {
    e.preventDefault();
    fetch('api/trips/addtrip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_name,
        description,
        destination,
        date_start,
        date_end,
        user_id: userInfo.user_id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log('data', data);
        toast.success('Trip added successfully');
        //navigate('/mytrips', { replace: true });
        console.log(data);
        props.onClose()
        window.location.reload(false)
      })
      .catch((e) => {
        //pop-up error handling instance
        toast.error('Trip added unsuccessfully');
        console.log({ e });
      });
  };

  return (
    <form onSubmit={handleSubmitAddTrip}>
      <div id='addtrip-parent'>
        <Typography
          component='h1'
          variant='h3'
          sx={{ mb: 2, paddingBottom: '10px' }}
        >
          Add Trip Details
        </Typography>

        {/* TRIP NAME INPUT */}
        <FormControl
          sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
          variant='outlined'
        >
          <InputLabel htmlFor='outlined-adornment-tripname'>
            Trip Name
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-tripname'
            autoComplete='off'
            inputProps={{ style: inputStyle }}
            value={trip_name}
            onChange={(e) => setTripName(e.target.value)}
            endAdornment={<InputAdornment position='end'></InputAdornment>}
            label='trip_name'
            data-test='trip_name'
          />
        </FormControl>

        {/* DESCRIPTION INPUT  */}
        <FormControl
          sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
          variant='outlined'
        >
          <InputLabel htmlFor='outlined-adornment-description'>
            Description
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-description'
            autoComplete='off'
            inputProps={{ style: inputStyle }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            endAdornment={<InputAdornment position='end'></InputAdornment>}
            label='description'
            data-test='description'
          />
        </FormControl>

        {/* DESTINATION INPUT */}
        <FormControl
          sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
          variant='outlined'
        >
          <InputLabel htmlFor='outlined-adornment-destination'>
            Destination
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-destination'
            autoComplete='off'
            inputProps={{ style: inputStyle }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            endAdornment={<InputAdornment position='end'></InputAdornment>}
            label='destination'
            data-test='destination'
          

          />
        </FormControl>

        {/* START DATE INPUT */}

        <FormControl
          sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
          variant='outlined'
        >
          <InputLabel htmlFor='outlined-adornment-startdate'>
            Start Date
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-startdate'
            autoComplete='off'
            inputProps={{ style: inputStyle }}
            value={date_start}
            onChange={(e) => setDateStart(e.target.value)}
            endAdornment={<InputAdornment position='end'></InputAdornment>}
            label='date_start'
            data-test='start_date'
          />
        </FormControl>

        <FormControl
          sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
          variant='outlined'
        >
          <InputLabel htmlFor='outlined-adornment-enddate'>End Date</InputLabel>
          <OutlinedInput
            id='outlined-adornment-enddate'
            autoComplete='off'
            inputProps={{ style: inputStyle }}
            value={date_end}
            onChange={(e) => setDateEnd(e.target.value)}
            endAdornment={<InputAdornment position='end'></InputAdornment>}
            label='date_end'
            data-test='end_date'
          />
        </FormControl>

        <Button
          sx={{ m: 1 }}
          variant='contained'
          color='primary'
          type='submit'
          className='button-block'
          onClick={handleSubmitAddTrip}
          data-test='trip_submit'
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddTrip;
