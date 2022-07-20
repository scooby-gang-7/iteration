import React, { useState, useEffect } from 'react';
import { Card, Divider, Grid, Stack, Typography } from '@mui/material';
import Places from './PlacesForCurrentTrip';
import Map from './map/Map.jsx';
import AddBuddy from './AddBuddy.jsx';
import { Link, useParams } from 'react-router-dom';
import ChatroomContainer from './chatroom/ChatroomContainer.jsx';
import axios from 'axios';
import { borderRadius, Container } from '@mui/system';

const TripDetail = (props) => {
  const [currentTripInfo, setCurrentTripInfo] = useState({});
  const [currentPlacesInfo, setCurrentPlacesInfo] = useState([]);
  const [center, setMapCenter] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    console.log(currentTripInfo);
  }, [currentTripInfo]);

  useEffect(() => {
    console.log(currentPlacesInfo);
  }, [currentPlacesInfo]);

  useEffect(() => {
    console.log(center);
  }, [center]);

  // fetching all places for the selected trip and storing them to currentTripInfo in state

  useEffect(() => {
    fetch('trips/getPlaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_id: id,
      }),
    })
      .then((placesDetails) => placesDetails.json())
      .then((placesDetails) => 
        setCurrentPlacesInfo(placesDetails)
      )
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    fetch('trips/getTrip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_id: id,
      }),
    })
      .then((tripDetails) => tripDetails.json())
      .then((tripDetails) => {
        setCurrentTripInfo(tripDetails);
        let query = `https://maps.googleapis.com/maps/api/geocode/json?address=${tripDetails.destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        axios
          .get(query)
          .then((res) => {
            if (res.data.status == 'OK') {
             
              setMapCenter(res.data.results[0].geometry.location);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const startDate = new Date(currentTripInfo.date_start);
  const startDateDisplay = `${
    startDate.getMonth() + 1
  }/${startDate.getDate()}/${startDate.getFullYear()}`;
  const endDate = new Date(currentTripInfo.date_end);
  const endDateDisplay = `${
    endDate.getMonth() + 1
  }/${endDate.getDate()}/${endDate.getFullYear()}`;

  return (
  
    <Container>
        <div id='detailsDiv'>
          <Stack

          direction='row'
          spacing={2}
          divider={<Divider orientation='vertical' flexItem />}
          alignItems='center'
          justifyContent='space-between'
        >
          <h1 className='standardHeader'>{currentTripInfo.trip_name}</h1>
          <Typography>{currentTripInfo.destination}</Typography>
          <Typography>{currentTripInfo.description}</Typography>
          <Typography>
            {startDateDisplay} - {endDateDisplay}
          </Typography>
          </Stack>
        </div>
     
          <AddBuddy trip_id={id} />
     
      <div id='mapDiv'>
        <Map
          center={center}
          trip_id={id}
          setCurrentPlacesInfo={setCurrentPlacesInfo}
          testProp={'this is the test prop'}
        />
      </div>
      <Places
        trip_id={id}
        currentPlacesInfo={currentPlacesInfo}
        setCurrentPlacesInfo={setCurrentPlacesInfo}
      />
      <div
        className='drawer-preview'
        style={{
          // width: 'min-content',
          display: 'block',
          position: 'sticky',
          bottom: '30px',
          right: 0,
          margin: '20px',
          float: 'right',
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: '4px',
        }}
      >
        <ChatroomContainer
          className='chatroomContainer'
          userInfo={props.userInfo}
          tripId={id}
        />
      </div>
    </Container>
  );
};

export default TripDetail;
