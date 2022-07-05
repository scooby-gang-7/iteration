import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import {Link} from 'react-router-dom';
import Trip from './Trip'

// INCLUDE MAP API


function MyTrips (props) {

    // console.log('My trip user_id ->', props.userInfo.user_id);
    console.log('My trip info ->', props.tripInfo);

    //on loading, fetch request to get all the trips info for the user
    useEffect(() => {
        fetch('http://localhost:3000/gettrips/', {
            method: 'POST',
            headers: {
                "COntent-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: props.userInfo.user_id
            })
        })
            .then(triplist => triplist.json())
            .then(triplist => {
                // console.log('here is the trips', triplist);
                props.setTripInfo(triplist);
            });
    }, []);

    return (
        <div>
            <h1>My Trips</h1>
            {/* This is where we will render each trip details page */}
            <br />
            <Link to="/addtrip">
            <button className='addTripButton'>Add Trip</button>
            </Link>
        </div>
             
          
    );
}


export default MyTrips;