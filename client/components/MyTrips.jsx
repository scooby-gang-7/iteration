import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import {Link} from 'react-router-dom';
import Trip from './Trip'

// INCLUDE MAP API
function MyTrips (props) {


    console.log('My trip props ->', props);
    console.log('My trip info ->', props.tripInfo);
    
    //on loading, fetch request to get all the trips info for the user
    useEffect(() => {
        fetch('http://localhost:3000/gettrips/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: props.userInfo.user_id
            })
        })
            .then(triplist => triplist.json())
            .then(triplist => {
                props.setTripInfo(triplist);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    return (
        <div>
            <h1>My Trips</h1>
            <br />
            {props.tripInfo.map((trip) => {
                return <Trip key={trip.trip_id} name={trip.trip_name} destination={trip.destination} start={trip.date_start} end={trip.date_end}/>
            })}
            <br />
            <Link to="/addtrip">
                <button className='addTripButton'>Add Trip</button>
            </Link>
        </div> 
    );
}


export default MyTrips;