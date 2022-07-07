import React, { useState, useMemo } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import MapItem from './mapItem';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@fdefelici/react-bootstrap-combobox";
// import "@reach/combobox/styles.css"

function mapp(props) {
  const { isLoaded } = useLoadScript({
    // better practice to put API key into ENV!!
    googleMapsApiKey: 'AIzaSyCHiRhiBXEfG9PCnAMeHI6qPuyupL02i78',
    // libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <Map />
    </div>
  )
}
const center = { lat: 44, lng: -80 }
const markers = [{ lat: 44, lng: -80 }, { lat: 45, lng: -79 }]
// ^^ const center and marker is placeholder for state
function Map() {
  console.log('selected here!!!!!')
  const pins = markers.map((pin, i) => <MapItem position={pin} key={i} />)
  const [selected, setSelected] = useState(null)
  
  return (
    <>
    
      <div className="places-container">
        {/* <PlacesAutoComplete setSelected={setSelected} /> */}
      </div>
      <GoogleMap
        zoom={7}
        center={center}
        mapContainerClassName="map-container"
      >
        {pins}
      </GoogleMap>
    </>
  )
}
// const PlacesAutoComplete = ({ setSelected }) => {
//   const {
//       ready,
//       value,
//       setValue,
//       suggestions: {status, data},
//       clearSuggestions
//   } = usePlacesAutocomplete();

//   return <Combobox>
//     <ComboboxInput value = {value}/>
//   </Combobox>
// };



export default mapp