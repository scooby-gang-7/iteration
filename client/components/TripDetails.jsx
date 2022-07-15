import React, { useState, useEffect } from 'react';
import '../stylesheets/styles.css';
import AddTrip from './AddTrip';
import Places from './Places.jsx';
import Row from './Row.jsx';
import Map from './map.jsx';
import AddBuddy from './AddBuddy.jsx';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const TripDetail = (props) => {
  const [currentTripInfo, setCurrentTripInfo] = useState({});
  const [currentPlacesInfo, setCurrentPlacesInfo] = useState([]);

  console.log('tripdetail', props);
  const [center, setMapCenter] = useState(null);

  const { id } = useParams();

  // fetching all places for the selected trip and storing them to currentTripInfo in state
  
    useEffect(() => {
      console.log("ID->", id)
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
          console.log('tripDetails from Fetch --> ', tripDetails);
          setCurrentTripInfo(tripDetails);
          let query =
            `https://maps.googleapis.com/maps/api/geocode/json?address=${tripDetails.destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
          axios
            .get(query)
            .then((res) => {
              console.log(res.data);
              if (res.data.status == 'OK') {
                console.log(res.data.results[0]);
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
        />
      </div>
      <Places
        trip_id={id}
        currentPlacesInfo={currentPlacesInfo}
        setCurrentPlacesInfo={setCurrentPlacesInfo}
      />
    </div>
  );
}

export default TripDetail;
