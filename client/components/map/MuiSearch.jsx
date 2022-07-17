import React from "react";
import AddressAutocomplete from 'mui-address-autocomplete';
import { Paper } from "@mui/material";

export default function MuiSearch(){

return (

    <AddressAutocomplete
      apiKey={process.env.GOOGLE_MAPS_API_KEY}
      label='Address'
      fields={['geometry']} // fields will always contain address_components and formatted_address, no need to repeat them
      onChange={(_, value) => {
        console.log(value);
      }}
    />

);
}