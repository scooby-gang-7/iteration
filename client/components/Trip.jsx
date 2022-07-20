import { Card, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Trip = (props) => {
  console.log('trip props:', props);

  // const [showDetail, setShowDetail] = useState(false);
  // const [center, setMapCenter] = useState(null);
  // console.log(center);

  // function handleSubmit() {
  //     let apikey = 'AIzaSyCHiRhiBXEfG9PCnAMeHI6qPuyupL02i78';
  //     let query = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + props.destination + '&key=' + apikey;
  //     axios.get(query)
  //         .then(res => {
  //             console.log(res.data);
  //             if (res.data.status == 'OK') {
  //                 console.log(res.data.results[0]);
  //                 setMapCenter(res.data.results[0].geometry.location);
  //                 setShowDetail(showDetail ? false : true);
  //             }
  //         }).catch(e => {
  //             console.log(e);
  //         })
  // }

  // return (
  //     <div>
  //         <button className='addTripButton' onClick={handleSubmit}>

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
        <Typography variant='h3'>{props.name}</Typography>
        <Typography variant='h5'>{props.destination}</Typography>
         <Typography variant='h7'>
          {startDateDisplay} - {endDateDisplay}
        </Typography>
      </Link>
    </Card>
  );
}

export default Trip;
