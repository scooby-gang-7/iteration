import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { borderRadius, Container } from '@mui/system';
import { Card, Divider, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import AddBuddy from './AddBuddy.jsx';
import ChatroomContainer from './chatroom/ChatroomContainer.jsx';
import Map from './map/Map.jsx';
import PlacesContainer from './PlacesContainer';

const TripDetail = (props) => {
  const [currentTripInfo, setCurrentTripInfo] = useState({});
  const [currentPlacesInfo, setCurrentPlacesInfo] = useState([]);
  const [center, setMapCenter] = useState(null);

  const { id } = useParams();

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

  const handleDeletePlace = () => {
    console.log('clicked delete place button')
  }

  return (
    <div>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          elevation={2}
          sx={{
            padding: '30px',
          }}
        >
          <Stack
            direction='row'
            spacing={2}
            divider={<Divider orientation='vertical' flexItem />}
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='h1' width='30%' fontWeight='bold'>
              {currentTripInfo.trip_name}
            </Typography>
            <Typography textAlign='center'>
              {currentTripInfo.destination}
            </Typography>
            <Typography textAlign='center'>
              {currentTripInfo.description}
            </Typography>
            <Typography textAlign='center'>
              {startDateDisplay} to {endDateDisplay}
            </Typography>
          </Stack>
          <Container
            sx={{
              paddingTop: '30px',
            }}
          >
            <AddBuddy trip_id={id} />
          </Container>
        </Card>
        <Card
          elevation={2}
          sx={{
            margin: '30px',
            padding: '30px',
            width: '80%',
            alignItems: 'center',
          }}
        >
          <Map
            center={center}
            trip_id={id}
            setCurrentPlacesInfo={setCurrentPlacesInfo}
          />
        </Card>
        <PlacesContainer
          trip_id={id}
          currentPlacesInfo={currentPlacesInfo}
          setCurrentPlacesInfo={setCurrentPlacesInfo}
          handleDeletePlace={handleDeletePlace}
        />
      </Container>
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
            backgroundColor: 'rgba(0,0,0,0.02)',
            borderRadius: '4px',
          }}
        >
          <ChatroomContainer
            className='chatroomContainer'
            userInfo={props.userInfo}
            tripId={id}
          />
        </div>
    </div>
  );
};

export default TripDetail;
