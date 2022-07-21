import React, { useState, useEffect } from 'react';
import '../stylesheets/styles.css';
import { Link } from 'react-router-dom';
import thumbsUp from '../assets/thumbsup.png';
import thumbsDown from '../assets/thumbsdown.png';

const Row = (props) => {
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
        // console.log('props.currentPlacesInfo --> ',props.currentPlacesInfo)
        const newPlacesInfo = props.currentPlacesInfo.map((obj) => {
          if (obj.place_id === props.place_id) return placesDetails;
          return obj;
        });
        // console.log('newPlacesInfo --> ',newPlacesInfo)
        props.setCurrentPlacesInfo(newPlacesInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <tr>
      <td>
        <table className='placeDetails'>
          <tbody>
            <tr>
              <td width='80%'>
                <b>{props.name}</b>
              </td>
              <td width='10%'>
                <img onClick={handleClick} id='upVote' src={thumbsUp} />
              </td>
              <td width='10%'>
                <img id='downVote' src={thumbsDown} onClick={handleClick} />
              </td>
            </tr>
            <tr>
              <td width='80%'>Address: {props.address}</td>
              <td width='10%'>
                <p className='count'>{props.up_vote}</p>
              </td>
              <td width='10%'>
                <p className='count'>{props.down_vote}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default Row;
