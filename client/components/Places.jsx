import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import {Link} from 'react-router-dom';
import Row from './Row.jsx'

function Places(props) {

    // fetching all places for the current trip and storing them to currentPlacesInfo in state
    useEffect(() => {
        fetch('http://localhost:3000/getPlaces', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trip_id: props.trip_id
            })
        })
            .then(placesDetails => placesDetails.json())
            .then(placesDetails => {
                console.log('placesDetails from Fetch --> ', placesDetails)
                props.setCurrentPlacesInfo(placesDetails);
            })
            .catch(e => {
                console.log(e);
            })
    });


    return (
        <div id='placesDiv'>
            <table id='placesTable'>
                <thead>
                    <tr>
                        <th>Places</th>
                    </tr>
                </thead>
                <tbody>
                    {props.placesDetails.map((place) => {
                        return <Row key={props.place_id} name={props.name} address={props.address} upvote={props.up_vote} downvote={props.down_vote}/>
                    })}
                </tbody>
            </table>
        </div>
    )

}


export default Places;