import React, { useState, useEffect } from 'react';
import { Card, Container, Divider, Typography, Stack } from '@mui/material'
import { textAlign } from '@mui/system';


const Addbuddy = (props) => {
  const { trip_id } = props;
  const [buddy_email, setBuddyemail] = useState('');
  const [trip_buddy, setTripbuddy] = useState([]);
  console.log(console.log('tripbuddy info', trip_buddy));

  useEffect(() => {
    fetch('trips/getbuddy', {
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
        setTripbuddy(data);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, [trip_id]);

  const handleAddBuddy = (e) => {
    e.preventDefault();
    fetch('trips/addbuddy', {
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
    tripmembers.push(<Typography key={el.name_first}>{el.name_first}</Typography>);
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
      <Typography>Trip Members</Typography>
      <div>
        <Stack
          direction='row'
          spacing={3}
        >
          {tripmembers}
        </Stack>
    </div>
      <div>
        <input
          type='text'
          placeholder={`Enter Your Friend's Email`}
          onChange={(e) => setBuddyemail(e.target.value)}
        />
        <button onClick={handleAddBuddy}>AddBuddy</button>
      </div>
    </Container>
  );
};

export default Addbuddy;
