import React, { useState, useEffect } from 'react';
import { Card, Chip, Divider, List, Typography,  } from '@mui/material';
import PlaceDetails from './PlaceDetails.jsx';

const PlacesContainer = (props) => {
  // fetching all places for the current trip and storing them to currentPlacesInfo in state

  return (
    <Card 
      elevation={2} 
      sx={{ 
        margin:'20px',
        padding:'30px',
        pb:'15px',
    }}>
      <div id='placesDiv'>
        <Typography variant='h2' fontWeight='bold'> Places to Visit</Typography>
        <List>
          {props.currentPlacesInfo
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((place) => {
              return (
                <>
                  <PlaceDetails
                    key={place.place_id}
                    place_id={place.place_id}
                    name={place.name}
                    address={place.address}
                    up_vote={place.up_vote}
                    down_vote={place.down_vote}
                    currentPlacesInfo={props.currentPlacesInfo}
                    setCurrentPlacesInfo={props.setCurrentPlacesInfo}
                    handleDeletePlace={props.handleDeletePlace}
                  />
                <Divider/>
                </>
              );
            })}
          
        </List>
      </div>
    </Card>
  );
};

export default PlacesContainer;
