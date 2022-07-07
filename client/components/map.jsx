import React, { useState, useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
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
} from "@reach/combobox";
import "@reach/combobox/styles.css"

function mapp(props) {
  const { isLoaded } = useLoadScript({
    // better practice to put API key into ENV!!
    googleMapsApiKey: 'AIzaSyCHiRhiBXEfG9PCnAMeHI6qPuyupL02i78',
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <Map />
    </div>
  )
}
const center = { lat: 44, lng: -80 }
// const markers = [{ lat: 44, lng: -80 }, { lat: 45, lng: -79 }]
// ^^ const center and marker is placeholder for state
function Map() {
  // console.log('selected here!!!!!')
  // const pins = markers.map((pin, i) => <MapItem position={pin} key={i} />)
  const [selected, setSelected] = useState(null)
  console.log(selected, 'this is selected')
  return (
    <>
      <div className="places-container">
        <PlacesAutoComplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={7}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
        {/* {pins} */}
      </GoogleMap>
    </>
  )
}
const PlacesAutoComplete = ({ selected, setSelected }) => {
 
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const {lat, lng} = await getLatLng(results[0]);
    // setSelected([...selected, results])
    
    setSelected({ lat, lng })
   
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search Location" />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && data.map(({ place_id, description }) => (
            <ComboboxOption key={place_id} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
};



export default mapp