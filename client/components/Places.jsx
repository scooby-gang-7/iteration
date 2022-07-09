import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import {Link} from 'react-router-dom';
import Row from './Row.jsx'

function Places(props) {

    // fetching all places for the current trip and storing them to currentPlacesInfo in state
    useEffect(() => {
        console.log('props.trip_id --> ', props.trip_id)
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
                console.log('this happened!')
                console.log('placesDetails from Fetch --> ', placesDetails)
                props.setCurrentPlacesInfo(placesDetails);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);


    return (
        <div id='placesDiv'>
            <table id='placesTable'>
                <thead>
                    <tr>
                        <th>Places to Visit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.currentPlacesInfo.sort((a,b) => (a.name > b.name) ? 1 : -1).map((place) => {
                        return <Row key={place.place_id} place_id={place.place_id} name={place.name} address={place.address} up_vote={place.up_vote} down_vote={place.down_vote} currentPlacesInfo={props.currentPlacesInfo} setCurrentPlacesInfo={props.setCurrentPlacesInfo}/>
                    })}
                </tbody>
            </table>
        </div>
    )

}


export default Places;