import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip';
import Places from "./Places.jsx";
import Row from "./Row.jsx";
import Map from "./map.js";
import AddBuddy from "./AddBuddy.jsx";
import {
    Link, 
    useParams
} from 'react-router-dom';



function TripDetail (props) {

    const {id} = useParams();

    // fetching all places for the selected trip and storing them to currentTripInfo in state
    useEffect(() => {
        fetch('http://localhost:3000/getTrip/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trip_id: id
            })
        })
            .then(tripDetails => tripDetails.json())
            .then(tripDetails => {
                console.log('tripDetails from Fetch --> ', tripDetails)
                props.setCurrentTripInfo(tripDetails);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);
    
    return (
        <div> 
            <div id='detailsDiv'>
                <h1 className='standardHeader'>{props.currentTripInfo.trip_name}</h1>
                <h2>{props.currentTripInfo.destination}</h2>
                <h2>{props.currentTripInfo.description}</h2>
                <h2>{props.currentTripInfo.start} - {props.currentTripInfo.end}</h2>
            </div>
            <div>
                <AddBuddy trip_id={id} />    
            </div>          
            
            <div id='mapDiv'>
                <Map />
            </div>
            <Places trip_id={id} currentPlacesInfo={props.currentPlacesInfo} setCurrentPlacesInfo={props.setCurrentPlacesInfo}/>
        </div>
        
    );
}


export default TripDetail;