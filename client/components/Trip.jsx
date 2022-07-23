import { Card, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Trip = (props) => {
  const startDate = new Date(props.start);
  const startDateDisplay = `${
    startDate.getMonth() + 1
  }/${startDate.getDate()}/${startDate.getFullYear()}`;
  const endDate = new Date(props.end);
  const endDateDisplay = `${
    endDate.getMonth() + 1
  }/${endDate.getDate()}/${endDate.getFullYear()}`;

  return (
    <Card sx={{ p: 2 }}>
      <Link to={`/mytrips/${props.trip_id}`}>
        <Typography variant='h2' color="#CC731C">{props.name}</Typography>
        <Typography variant='h4' color="#154d60">{props.destination}</Typography>
         <Typography>
          {startDateDisplay} - {endDateDisplay}
        </Typography>
      </Link>
    </Card>
  );
}

export default Trip;
