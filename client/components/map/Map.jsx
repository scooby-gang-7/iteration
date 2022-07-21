import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import MapItem from './MapItem';
import axios from 'axios';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import "@reach/combobox/styles.css"

function Mapp(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Map
        destination={props.destination}
        center={props.center}
        trip_id={props.trip_id}
        setCurrentPlacesInfo={props.setCurrentPlacesInfo}
      />
    </div>
  );
}
const url =
  'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

function Map(props) {
  const [selected, setSelected] = useState([]);
  const pins = selected.map((pin, i) => (
    <MapItem position={pin} key={i} animation={google.maps.Animation.DROP} />
  ));

  const { trip_id } = props;

  // -------- get places specific for the trip -----------
  const [places, setPlaces] = useState(null);
  //on render, fetch to get all the stops for the trip
  useEffect(() => {
    axios
      .get('places/', {
        params: {
          trip_id,
        },
      })
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const PlacesAutoComplete = (props) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();

    // ------handles choosing an address from search dropdown menu------
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });

      const { lat, lng } = await getLatLng(results[0]);
      setSelected((selected) => [...selected, { lat, lng }]);

      console.log('selected', results[0])
  
      const newplace = {
        trip_id,
        google_place_id: results[0].place_id,
        name: address, //todo get the first part of
        address: results[0].formatted_address,
        type: results[0].type,
        lat: lat,
        long: lng,
      };
      console.log('new place selected (map.jsx line 133)', newplace);

      fetch('trips/addplace', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newplace),
      })
        .then((data) => data.json())
        .then((data) => {
          //then do another fetch
          fetch('trips/getPlaces', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              trip_id: props.trip_id,
            }),
          })
            .then((placesDetails) => placesDetails.json())
            .then((placesDetails) => {
              props.setCurrentPlacesInfo(placesDetails);
            })
            .catch((e) => {
              console.log('error in map.jsx fetch getplaces: ', e);
            });
        })
        .catch((e) => {
          console.log('error in map.jsx fetch addplace: ', e);
        });
    };

    return (
      <>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className='combobox-input'
            placeholder='Search Location'
            style={{ width: '90%', height: 30, fontSize: 16, display: 'block', margin: 'auto'}}
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === 'OK' &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </>
    );
  };
  //todo use places to get another set of pins

  return (
    <>
      <div className='places-container'>
        <PlacesAutoComplete
          setSelected={setSelected}
          trip_id={trip_id}
          setCurrentPlacesInfo={props.setCurrentPlacesInfo}
        />
      </div>
      <div id='searchField'></div>
      <GoogleMap
        zoom={11}
        center={props.center}
        mapContainerClassName='map-container'
      >
        <Marker position={props.center} icon={url} />
        {selected && pins}
      </GoogleMap>
    </>
  );
}

export default Mapp;
