import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
} from '@mui/material';

const Addbuddy = (props) => {
  const { trip_id } = props;
  const [buddy_email, setBuddyemail] = useState('');
  const [trip_buddy, setTripbuddy] = useState([]);
  console.log(console.log('tripbuddy info', trip_buddy));

  const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' };
  useEffect(() => {
    fetch('api/trips/getbuddy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        let permission = false;
        for (let buddy of data) {
          if (buddy.user_id === props.userInfo.user_id) permission = true;
        }
        if (!permission) window.location.pathname = '/404';
        setTripbuddy(data);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, [trip_id]);

  const handleAddBuddy = (e) => {
    e.preventDefault();
    fetch('api/trips/addbuddy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_id,
        buddy_email,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setTripbuddy(data);
      })
      .catch((e) => {
        console.log({ e });
      });
  };

  const tripmembers = [];
  trip_buddy.forEach((el) => {
    tripmembers.push(
      <Typography key={el.name_first}>{el.name_first}</Typography>
    );
  });

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      <Typography fontWeight='bold'>Trip Members</Typography>
      <div>
        <Stack direction='row' spacing={3}>
          {tripmembers}
        </Stack>
      </div>
      <div>
        <FormControl
          sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
          variant='outlined'
        >
          <InputLabel htmlFor='outlined-adornment-email'>
            Buddy's Email
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-email'
            autoComplete='off'
            inputProps={{ style: inputStyle }}
            // placeholder={`Enter Your Friend's Email`}
            onChange={(e) => setBuddyemail(e.target.value)}
            label='email'
          />
          <Button
            sx={{ m: 1 }}
            variant='contained'
            color='primary'
            className='button-block'
            onClick={handleAddBuddy}
          >
            Add Buddy
          </Button>
        </FormControl>
      </div>
    </Container>
  );
};

export default Addbuddy;
