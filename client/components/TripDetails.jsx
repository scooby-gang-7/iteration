import React, { useState, useEffect } from 'react';
import Places from './PlacesForCurrentTrip';
import Map from './map/Map.jsx';
import AddBuddy from './AddBuddy.jsx';
import { Link, useParams } from 'react-router-dom';
import ChatroomContainer from './chatroom/ChatroomContainer.jsx'
import axios from 'axios';

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
      .then((placesDetails) => {
        console.log('this happened!');
        console.log('placesDetails from Fetch --> ', placesDetails);
        setCurrentPlacesInfo(placesDetails);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log(
      'tripdetails is remounting -------------------------------------'
    );
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
        console.log(
          'tripDetails from Fetch --> in tripdetails.jsx line 34 --->',
          tripDetails
        );
        setCurrentTripInfo(tripDetails);
        let query = `https://maps.googleapis.com/maps/api/geocode/json?address=${tripDetails.destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        axios
          .get(query)
          .then((res) => {
            console.log('in tripdetails.jsx line 42 --->', res.data);
            if (res.data.status == 'OK') {
              console.log(
                'in tripdetails.jsx line 45 --->',
                res.data.results[0]
              );
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
    <div>
      <div id='detailsDiv'>
        <h1 className='standardHeader'>{currentTripInfo.trip_name}</h1>
        <p>{currentTripInfo.destination}</p>
        <p>{currentTripInfo.description}</p>
        <p>
          {startDateDisplay} - {endDateDisplay}
        </p>
      </div>
      <div id='addBuddyDiv'>
        <AddBuddy trip_id={id} />
      </div>
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
      <ChatroomContainer userInfo={props.userInfo} tripId={id}/>
    </div>
  );
};

export default TripDetail;
