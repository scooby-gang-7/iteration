import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import {Link} from 'react-router-dom';
import Trip from './Trip'

// INCLUDE MAP API


function MyTrips () {

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