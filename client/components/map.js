import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import MapItem from './mapItem';

function mapp() {
  const { isLoaded } = useLoadScript({
    // better practice to put API key into ENV!!
    googleMapsApiKey: 'AIzaSyCHiRhiBXEfG9PCnAMeHI6qPuyupL02i78',
  });

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <Map />
    </div>
  )
}
const center = { lat: 44, lng: -80 }
const markers = [{lat: 44, lng: -80}, {lat: 45, lng: -79}]
// ^^ const center and marker is placeholder for state
function Map() {
 const pins = markers.map((pin, i) => <MapItem position={pin} key={i} />)
  return <GoogleMap
    zoom={7}
    center={center}
    mapContainerClassName="map-container"
  >
    {pins}
  </GoogleMap>
}

export default mapp