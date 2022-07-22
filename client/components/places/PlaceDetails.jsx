import React, { useState, useEffect } from 'react';
import { Chip, Divider, ListItem, Stack, Typography } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const PlaceDetails = (props) => {
  function handleClick(e) {
    e.preventDefault();
    console.log('e.target --> ', e.target);
    const body = {
      place_id: props.place_id,
      up_vote: 0,
      down_vote: 0,
    };

    e.target.id == 'upVote' ? (body.up_vote += 1) : (body.down_vote += 1);

    fetch('api/trips/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((placesDetail) => placesDetail.json())
      .then((placesDetails) => {
        const newPlacesInfo = Object.values(props.currentPlacesInfo).map(
          (obj) => {
            if (obj.place_id === props.place_id) return placesDetails;
            return obj;
          }
        );
        const tempObj = {};
        for (let place of newPlacesInfo) {
          tempObj[place.place_id] = place;
        }
        console.log(tempObj);
        props.setCurrentPlacesInfo(tempObj);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleDeletePlace = () => {
    // delete from DB, then update react
    fetch('api/trips/deleteplace', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        place_id: props.place_id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data) {
          // if we have a response, proceed with removing from react state
          // create clone of currentplaces
          const tempObj = { ...props.currentPlacesInfo };
          // remove place from currentplaces in temp
          delete tempObj[props.place_id];
          // props.setcurrentplaces
          props.setCurrentPlacesInfo(tempObj);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ListItem>
      <Stack direction='row' spacing={3} width='100%'>
        <Stack width='75%'>
          <Typography fontWeight='bold'color= "#154d60">{props.name}</Typography>
          <Typography color= "#154d60" >{props.address}</Typography>
        </Stack>

        <Stack direction='row' alignItems='center' spacing={2}>
          <Stack direction='row' spacing={2}>
            <Stack>
              <ThumbUpIcon
                onClick={handleClick}
                id='upVote'
                width='30px'
                sx={{
                  color: '#CC731C',
                }}
              />

              <div>{props.up_vote}</div>
            </Stack>
            <Stack>
              <ThumbDownIcon
                id='downVote'
                onClick={handleClick}
                width='30px'
                sx={{
                  color: '#CC731C',
                }}
              />
              <div>{props.down_vote}</div>
            </Stack>
          </Stack>
          <Chip
            label='Remove'
            variant='outlined'
            onDelete={handleDeletePlace}
          />
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default PlaceDetails;
