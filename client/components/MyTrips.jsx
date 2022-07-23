import React, { useState, useEffect } from 'react';
import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import AddTripModal from './addTrip/AddTripModal';
import Trip from './Trip';
import BannerImg from '../assets/lane.png'

const MyTrips = (props) => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //on loading, fetch request to get all the trips info for the user
  useEffect(() => {
    fetch('api/trips/gettrips/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: props.userInfo.user_id,
      }),
    })
      .then((triplist) => triplist.json())
      .then((triplist) => {
        // props.setTripInfo(triplist);
        handleAllTrips(triplist);
        setIsLoaded(true);
      })
      .catch((e) => {
        setIsLoaded(true);
        console.log(e);
      });
  }, []);

  const today = new Date();

  const handleAllTrips = (tripList) => {
    const today = new Date();
    const tempUpcomingTrips = [];
    const tempPastTrips = [];

    // sort trips by date within the past and upcoming arrays
    tripList
      .sort((a, b) => {
        if (a.date_start > b.date_start) return 1;
        else if (a.date_start < b.date_start) return -1;
        else if (a.date_start === b.date_start) {
          return a.date_end > b.date_end ? 1 : -1;
        }
      })

      //check the start date. if the start date is today or future, push trip to tempUpcomingTrips, else push trip to tempPastTrips
      .forEach((trip) => {
        const tripStart = new Date(`${trip.date_start}`);
        if (tripStart.getTime() >= today.getTime()) {
          tempUpcomingTrips.push(trip);
        } else {
          tempPastTrips.push(trip);
        }
      });
    setPastTrips(tempPastTrips);
    setUpcomingTrips(tempUpcomingTrips);
  };

  if (isLoaded) {
    return (
      
      <Container
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >

          <img src={BannerImg} width='900px' max-height={300}/>
        
        <AddTripModal
          userInfo={props.userInfo}
          setTripInfo={props.setTripInfo}
        />
        <div id='upcomingTrips' test-data="upcoming_trips">
          <Typography variant='h3' m={2} mb={1}>
            Upcoming Trips
          </Typography>
          <Stack>
            {upcomingTrips.length >= 1 ? (
              upcomingTrips.map((trip) => {
                return (
                  <Card p={3} key={trip.trip_id}>
                    <Trip
                      trip_id={trip.trip_id}
                      name={trip.trip_name}
                      destination={trip.destination}
                      start={trip.date_start}
                      end={trip.date_end}
                    />
                  </Card>
                );
              })
            ) : (
              <Typography>
                There are no upcoming trips. Time to start planning! Add a trip
                by clicking the 'Add Trip' button above.
              </Typography>
            )}
          </Stack>
        </div>
        <div id='pastTrips' test-data='past_trips'>
          <Stack>
            <Typography variant='h3' m={3} mb={1}>
              Past Trips
            </Typography>
            {pastTrips.length >= 1 ? (
              pastTrips.map((trip) => {
                return (
                  <Card p={3} key={trip.trip_id}>
                    <Trip
                      trip_id={trip.trip_id}
                      name={trip.trip_name}
                      destination={trip.destination}
                      start={trip.date_start}
                      end={trip.date_end}
                    />
                  </Card>
                );
              })
            ) : (
              <Typography>
                Looks like you don't have any trip history. It's time to start
                planning!
              </Typography>
            )}
          </Stack>
        </div>
      </Container>
    );
  }
};

export default MyTrips;
