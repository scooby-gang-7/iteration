import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import MapItem from './mapItem';
import axios from 'axios';

function Mapp(props) {
  const { isLoaded } = useLoadScript({
    // better practice to put API key into ENV!!
    googleMapsApiKey: 'AIzaSyCHiRhiBXEfG9PCnAMeHI6qPuyupL02i78',
  });

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <Map destination={props.destination}/>
    </div>
  )
}

// ^^ const center and marker is placeholder for state
function Map(props) {
  console.log('map center', props.destination);

  // const center = { lat: 44, lng: -80 }
  const markers = [{lat: 44, lng: -80}, {lat: 45, lng: -79}]
  const [mapcenter, setMapCenter] = useState({});

  console.log('map center', mapcenter);

  const geocoder = new google.maps.Geocoder();
  useEffect(() => {
    geocoder.geocode( { 'address': props.destination}, function(results, status) {
      if (status == 'OK') {
        setMapCenter(results[0].geometry.location.toJSON());
        console.log(results[0].geometry.location.toJSON());
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })
  });

  const pins = markers.map((pin, i) => <MapItem position={pin} key={i} />)
  return <GoogleMap
    zoom={8}
    center={mapcenter}
    mapContainerClassName="map-container"
  >
    {/* <Marker position = {center} /> */}
    {/* {pins} */}
  </GoogleMap>
}

export default Mapp