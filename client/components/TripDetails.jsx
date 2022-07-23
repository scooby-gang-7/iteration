import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { borderRadius, Container } from '@mui/system';
import { Card, Divider, Grid, Stack, Typography, Button} from '@mui/material';
import axios from 'axios';
import AddBuddy from './AddBuddy.jsx';
import ChatroomContainer from './chatroom/ChatroomContainer.jsx';
import Map from './map/Map.jsx';
import PlacesContainer from './places/PlacesContainer';
import BannerImg from '../assets/plan.png';

const TripDetail = (props) => {
  const [currentTripInfo, setCurrentTripInfo] = useState({});
  const [currentPlacesInfo, setCurrentPlacesInfo] = useState({});
  const [center, setMapCenter] = useState(null);

  const { id } = useParams();

  // fetching all places for the selected trip and storing them to currentTripInfo in state

  useEffect(() => {
    fetch('api/trips/getPlaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_id: id,
      }),
    })
      .then((placesDetails) => placesDetails.json())
      .then((placesDetails) => {
        const tempObj = {};
        for (let place of placesDetails) {
          tempObj[place.place_id] = place;
        }
        console.log(tempObj);
        setCurrentPlacesInfo(tempObj);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    fetch('api/trips/getTrip', {
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
        window.location.pathname = '/404';
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
    <div>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={BannerImg} width='900px' max-height={300} />
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
            sx={{ paddingBottom: '30px' }}
          >
            <Typography variant='h1' width='30%' fontWeight='bold' color= "#154d60">
              {currentTripInfo.trip_name}
            </Typography>
            <Typography textAlign='center'color="#154d60">
              {currentTripInfo.destination}
            </Typography>
            <Typography textAlign='center' color="#154d60">
              {currentTripInfo.description}
            </Typography>
            <Typography textAlign='center' color="#154d60">
              {startDateDisplay} to {endDateDisplay}
            </Typography>
            <Typography textAlign='center' color="#ffffff">
            <Button
                sx={{ m: 1 }}
                variant='contained'
                type='submit'
                className='button-block'
                component={Link} to = {`/mytrips/bulletin`}
              > Add Custom Details</Button>
            </Typography>
          </Stack>
          <Container
            sx={{
              paddingTop: '30px',
            }}
          >
            <AddBuddy trip_id={id} userInfo={props.userInfo} />
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
