import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import MapItem from './mapItem';
import axios from 'axios';

function Mapp(props) {
  console.log('mapp props', props);
  const { isLoaded } = useLoadScript({
    // better practice to put API key into ENV!!
    googleMapsApiKey: 'AIzaSyCHiRhiBXEfG9PCnAMeHI6qPuyupL02i78',
  });
  

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <Map destination={props.destination} center={props.center}/>
    </div>
  )
}

// ^^ const center and marker is placeholder for state
function Map(props) {
  console.log('map props', props);

  // const center = { lat: 44, lng: -80 }
  const markers = [{lat: 44, lng: -80}, {lat: 45, lng: -79}];

  const pins = markers.map((pin, i) => <MapItem position={pin} key={i} />)
  return <GoogleMap
    zoom={8}
    center={props.center}
    mapContainerClassName="map-container"
  >
    {/* <Marker position = {center} /> */}
    {/* {pins} */}
  </GoogleMap>
}

export default Mapp