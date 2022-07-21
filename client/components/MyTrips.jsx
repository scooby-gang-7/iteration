import React, { useState, useEffect } from 'react';
import { Card, Grid } from '@mui/material';
import AddTripModal from './addTrip/AddTripModal';
import Trip from './Trip';

const MyTrips = (props) => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);

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
        console.log(triplist);
        handleAllTrips(triplist);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const today = new Date();

  const handleAllTrips = (tripList) => {
    const today = new Date();
    tripList
      // sort trips by date within the past and upcoming arrays

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
          setUpcomingTrips([...upcomingTrips, trip]);
        } else {
          setPastTrips([...pastTrips, trip]);
        }
      });
  };

  console.log('upcoming trips with hooks---', upcomingTrips);
  console.log('past trips with hooks---', pastTrips);

  return (
    <>
      <AddTripModal userInfo={props.userInfo} setTripInfo={props.setTripInfo} />
      <div id='upcomingTrips'>
        <h1>Upcoming Trips</h1>
        {upcomingTrips.length >= 1 ? (
          upcomingTrips.map((trip) => {
            return (
              <Card>
                <Trip
                  key={trip.trip_id}
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
          <div> you have no upcoming trips </div>
        )}
      </div>
      <div id='pastTrips'>
        <h1>Past Trips</h1>
        {pastTrips.length >= 1 ? (
          pastTrips.map((trip) => {
            return (
              <Card>
                <Trip
                  key={trip.trip_id}
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
          <div>
            Looks like you don't have any trip history. It's time to start
            planning!
          </div>
        )}
      </div>
    </>
  );
};

export default MyTrips;
