import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import {
    Link, 
    useParams
} from 'react-router-dom';



function TripDetail (props) {

    const {id} = useParams();

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
            
            <div id='mapDiv'>
                <h2>MAP</h2>
            </div>
            
            <div id='placesDiv'>
                <table id='placesTable'>
                    <thead>
                        <tr>
                            <th>Restaurants</th>
                            <th>Activities</th>
                            <th>Sightseeing</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            
        </div>
        
    );
}


export default TripDetail;