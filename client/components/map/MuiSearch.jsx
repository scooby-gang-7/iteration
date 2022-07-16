import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const MuiSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [returnedSuggestions, setReturnedSuggestions] = useState('');
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_MAPS_API_KEY}&query=${searchText}`;

  //create an autocomplete dropdown input field
  //take the input value and convert spaces to underscores
  //store this new input string as searchText
  //fetch the apiUrl
  //parse the returned JSON object
  //render the returned suggestions in the dropdown

  const fetchSearchSuggestions = () => {
    axios
      .get(apiUrl)
      .then((data) => {
        setReturnedSuggestions(data);
        console.log('returnedSuggestions--->', returnedSuggestions);
      })
      .catch((error) => console.log('error in fetchSearchSuggestions,', error));
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id='mapSearchField'
        disableClearable
        onChange={(event, value) => {
          setSearchText(value);
          console.log('searchText -->', searchText);
        }} // prints the selected value
        options={returnedSuggestions.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search input'
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
};

export default MuiSearch;

// export default function FreeSolo() {
//   return (
//     <Stack spacing={2} sx={{ width: 300 }}>
//       <Autocomplete
//         id="free-solo-demo"
//         freeSolo
//         options={top100Films.map((option) => option.title)}
//         renderInput={(params) => <TextField {...params} label="freeSolo" />}
//       />
//       <Autocomplete
//         freeSolo
//         id="free-solo-2-demo"
//         disableClearable
//         options={top100Films.map((option) => option.title)}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Search input"
//             InputProps={{
//               ...params.InputProps,
//               type: 'search',
//             }}
//           />
//         )}
//       />
//     </Stack>
//   );
// }
