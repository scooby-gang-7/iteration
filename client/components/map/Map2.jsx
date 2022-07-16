// import React, {useMemo, useState} from "react";
// import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from 'use-places-autocomplete';
// // import { SearchBox } from 'react-google-maps/lib/places/SearchBox';
// // import { SearchBox } from '@react-google-maps';
// const {
//   SearchBox,
// } = require('react-google-maps/lib/components/places/SearchBox');

// //main component to export, which renders our map
// export default function TripMap({ tripCoords }){
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
//     libraries: ['places'],
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return (
//     <div id="tripMap">
//   <Map tripCoords = {tripCoords}/>
//   </div>
//   )
// }


// //this function creates our map that will be rendered
// function Map({tripCoords}){
//   const[newCenter, setNewCenter] = useState({}); //variable for the center of the map on reload if the map is moved around and rerendered
//   // const tripCoords = useMemo(()=>{tripCoords},[]); //memoizes where to center the map on rerender
  
//   //return "GoogleMap" element imported above, passing in the starting zoom, and the center where the map will be focused on load. 
//   return (
//     <div id='newMap'>
//       <GoogleMap
//         zoom={6}
//         center={tripCoords}
//         mapContainerClassName='map-container'
//         >
//         <Marker position={tripCoords} />
//         {/* <SearchBox
//           ref={props.onSearchBoxMounted}
//           bounds={props.bounds}
//           controlPosition={google.maps.ControlPosition.TOP_LEFT}
//           onPlacesChanged={props.onPlacesChanged}
//           >
//           <input
//             type='text'
//             placeholder='Customized your placeholder'
//             style={{
//               boxSizing: `border-box`,
//               border: `1px solid transparent`,
//               width: `240px`,
//               height: `32px`,
//               marginTop: `27px`,
//               padding: `0 12px`,
//               borderRadius: `3px`,
//               boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//               fontSize: `14px`,
//               outline: `none`,
//               textOverflow: `ellipses`,
//             }}
//             />
//         </SearchBox> */}
//         {/* {props.markers.map((marker, index) => (
//           <Marker key={index} position={marker.position} />
//           ))} */}
//       </GoogleMap>
//     </div>
//   );
// }

// // -------adding a search box -------- 
// // https://developers.google.com/maps/documentation/javascript/reference/event#MVCObject
// // https://developers.google.com/maps/documentation/javascript/reference/places-widget#SearchBox

// // const searchBox = new google.maps.places.SearchBox(input);
// // SearchBox(HTMLInputElement)
// const PlacesAutocomplete = () => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions
//   } = usePlacesAutocomplete({
//     requestOptions: { /* Define search scope here */ }
//     // debounce: 300
//   });
//   // const registerRef = useOnclickOutside(() => {
//   //   // When user clicks outside of the component, we can dismiss
//   //   // the searched suggestions by calling this method
//   //   clearSuggestions();
//   // });

//   const handleInput = e => {
//     // Update the keyword of the input element
//     setValue(e.target.value);
//   };

//   const handleSelect = ({ description }) => () => {
//     // When user selects a place, we can replace the keyword without request data from API
//     // by setting the second parameter as "false"
//     setValue(description, false);
//     clearSuggestions();

//     // Get latitude and longitude via utility functions
//     getGeocode({ address: description })
//       .then(results => getLatLng(results[0]))
//       .then(({ lat, lng }) => {
//         console.log('? Coordinates: ', { lat, lng });
//       }).catch(error => {
//         console.log('? Error: ', error)
//       });
//   };

//   const renderSuggestions = () =>
//     data.map(suggestion => {
//       const {
//         id,
//         structured_formatting: { main_text, secondary_text }
//       } = suggestion;

//       return (
//         <li
//           key={id}
//           onClick={handleSelect(suggestion)}
//         >
//           <strong>{main_text}</strong> <small>{secondary_text}</small>
//         </li>
//       );
//     });

//   return (
//     <div ref={registerRef}>
//       <input
//         value={value}
//         onChange={handleInput}
//         disabled={!ready}
//         placeholder="Where are you going?"
//       />
//       {/* We can use the "status" to decide whether we should display the dropdown or not */}
//       {status === 'OK' && <ul>{renderSuggestions()}</ul>}
//     </div>
//   );
// };