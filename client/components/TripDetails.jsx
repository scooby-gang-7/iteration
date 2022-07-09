import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip';
import Places from "./Places.jsx";
import Row from "./Row.jsx"
import Map from "./map.jsx"
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
    
    const startDate = new Date(props.currentTripInfo.date_start)
    const startDateDisplay = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()}`
    const endDate = new Date(props.currentTripInfo.date_end)
    const endDateDisplay = `${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`

    return (
        <div> 
            <div id='detailsDiv'>
                <h1 className='standardHeader'>{props.currentTripInfo.trip_name}</h1>
                <p>{props.currentTripInfo.destination}</p>
                <p>{props.currentTripInfo.description}</p>
                <p>{startDateDisplay} - {endDateDisplay}</p>
            </div>          
            
            <div id='mapDiv'>
                <Map />
            </div>
            <Places trip_id={id} currentPlacesInfo={props.currentPlacesInfo} setCurrentPlacesInfo={props.setCurrentPlacesInfo}/>
        </div>
        
    );
}


export default TripDetail;