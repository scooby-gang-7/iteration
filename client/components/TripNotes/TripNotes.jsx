import React, { useState, useEffect } from 'react';
import { Box, Card, Grid, TextField, Button } from '@mui/material';

const TripNotes = (props) => {
  const [notes, setNotes] = useState('');
  const [edit, setEdit] = useState(false);
  const { tripId } = props;
  
  const handleSubmitNotes = (e) => {
    
    // to prevent rerender
    console.log('adding notes', notes);
    e.preventDefault();
    fetch('api/trips/addNotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tripId, 
        notes
      }),
    })
      .then((data) => {
        // console.log('this is trip notes', data);
        return data.json();
      })
      .then((data) => {
        console.log('this is trip notes', data);
        // setNotes(notes);
        setEdit(false);
      });
  };
  useEffect(() => {
    fetch('api/trips/getNotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tripId
      }),
    })
      .then((data) => {
        console.log('this is trip notes', data);
        return data.json();
      })
      .then((data) => {
        console.log('this is trip notes', data);
        setNotes(data.notes);
        // setEdit(false);
      });
  }, [])

  return (
    (!edit) ? <Box
      >
        <TextField
          id="filled-multiline-static"
          multiline
          rows={10}
          defaultValue={notes}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <Button
              sx={{ m: 1 }}
              variant='contained'
              color='primary'
              className='button-block'
              onClick={(e) => setEdit(true)}
        >
          Edit Trip Notes
        </Button>
      </Box> : <Box
        component='form'
      >
        <TextField
          id="filled-multiline-static"
          multiline
          rows={10}
          defaultValue={notes}
          variant="filled"
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button
              sx={{ m: 1 }}
              variant='contained'
              color='primary'
              type='submit'
              className='button-block'
              onClick={handleSubmitNotes}
        >
          Save Notes
        </Button>
      </Box>
  );
};

export default TripNotes;