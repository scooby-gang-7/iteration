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

// const google = window.google;

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
// center is a placeholder for state
const url =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
// const scaledSize = new google.maps.Size(38, 31)

function Map() {
  const [selected, setSelected] = useState([])
  const centerCity = <MapItem
    position={center}
    key={center}
    icon={url}
    title={'Where it will all go down!'}
    animation={google.maps.Animation.DROP}
  />
  const pins = selected.map((pin, i) => <MapItem
    position={pin}
    key={i}
    animation={google.maps.Animation.DROP}
  />)
  return (
    <>
      <div className="places-container">
        <PlacesAutoComplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={6}
        center={center}
        mapContainerClassName="map-container"
      >
        {centerCity}
        {selected && pins}
      </GoogleMap>
    </>
  )
}
const PlacesAutoComplete = ({ setSelected }) => {

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
    const { lat, lng } = await getLatLng(results[0]);
    console.log(typeof (lat), 'lat')
    setSelected(selected => [...selected, { lat, lng }])
  }

  return (
    <Combobox onSelect={handleSelect}>
      {/* <p> */}
        {/* <label for="enteringStops">Add to map here! ---{'>'} </label> */}
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search Location" />
      {/* </p> */}
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