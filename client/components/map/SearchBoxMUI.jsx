// import React, { useEffect, useState, useRef, useMemo } from 'react';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// // import parse from 'autosuggest-highlight/parse';
// import throttle from 'lodash/throttle';
// import AddressAutocomplete from 'mui-address-autocomplete';

// function loadScript(src, position, id) {
//   if (!position) {
//     return;
//   }
//   <AddressAutocomplete
//     apiKey={process.env.GOOGLE_MAP_API_KEY}
//     label='Address'
//     fields={['geometry']} // fields will always contain address_components and formatted_address, no need to repeat them
//     onChange={(_, value) => {
//       console.log(value);
//     }}
//   />;

//   const script = document.createElement('script');
//   script.setAttribute('async', '');
//   script.setAttribute('id', id);
//   script.src = src;
//   position.appendChild(script);
// }

// const autocompleteService = { current: null };

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     color: theme.palette.text.secondary,
//     marginRight: theme.spacing(2),
//   },
// }));

// export default function SearchBoxMUI() {
//   const classes = useStyles();
//   const [inputValue, setInputValue] = useState('');
//   const [options, setOptions] = useState([]);
//   const loaded = useRef(false);

//   if (typeof window !== 'undefined' && !loaded.current) {
//     if (!document.querySelector('#google-maps')) {
//       loadScript(
//         `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`,
//         document.querySelector('head'),
//         'google-maps'
//       );
//     }

//     loaded.current = true;
//   }

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const fetch = useMemo(
//     () =>
//       throttle((input, callback) => {
//         autocompleteService.current.getPlacePredictions(input, callback);
//       }, 200),
//     []
//   );

//   useEffect(() => {
//     let active = true;

//     if (!autocompleteService.current && window.google) {
//       autocompleteService.current =
//         new window.google.maps.places.AutocompleteService();
//     }
//     if (!autocompleteService.current) {
//       return undefined;
//     }

//     if (inputValue === '') {
//       setOptions([]);
//       return undefined;
//     }

//     fetch({ input: inputValue, types: ['establishment']}, (results) => {
//       if (active) {
//         setOptions(results || []);
//       }
//     });

//     return () => {
//       active = false;
//     };
//   }, [inputValue, fetch]);

//   return (
//     <Autocomplete
//       id='google-map-demo'
//       style={{ width: 600 }}
//       getOptionLabel={(option) =>
//         typeof option === 'string' ? option : option.description
//       }
//       filterOptions={(x) => x}
//       options={options}
//       autoComplete
//       includeInputInList
//       freeSolo
//       disableOpenOnFocus
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label='Add a location'
//           variant='outlined'
//           fullWidth
//           onChange={handleChange}
//         />
//       )}
//       renderOption={(option) => {
//         const matches =
//           option.structured_formatting.main_text_matched_substrings;
//         // const parts = parse(
//         //   option.structured_formatting.main_text,
//         //   matches.map((match) => [match.offset, match.offset + match.length])
//         // );

//         return (
//           <Grid container alignItems='center'>
//             <Grid item>
//               <LocationOnIcon className={classes.icon} />
//             </Grid>
//             <Grid item xs>
//               {/* {parts.map((part, index) => (
//                 <span
//                   key={index}
//                   style={{ fontWeight: part.highlight ? 700 : 400 }}
//                 >
//                   {part.text}
//                 </span>
//               ))} */}

//               <Typography variant='body2' color='textSecondary'>
//                 {option.structured_formatting.secondary_text}
//               </Typography>
//             </Grid>
//           </Grid>
//         );
//       }}
//     />
//   );
// }
