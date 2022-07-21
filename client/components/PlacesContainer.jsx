import React from 'react';
import { Card, Container, Divider, List, Typography,  } from '@mui/material';
import PlaceDetails from './PlaceDetails.jsx';

const PlacesContainer = (props) => {
  // fetching all places for the current trip and storing them to currentPlacesInfo in state

  return (
    <>
      <Card
        elevation={2}
        sx={{
          margin: '20px',
          padding: '30px',
          pb: '15px',
        }}
      >
        <Typography variant='h2' fontWeight='bold' position='static'>
          Places to Visit
        </Typography>
          <Container
            sx={{
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
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
                      <Divider />
                    </>
                  );
                })}
            </List>
          </Container>
      </Card>
    </>
  );
};

export default PlacesContainer;
