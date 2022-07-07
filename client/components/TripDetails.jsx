import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import Trip from './Trip'
import {Link} from 'react-router-dom';


// Trip Details is the overarching pop-up window that includes ALL the trip info / suggestions. UPVOTE and DOWNVOTE functionality.

function TripDetails (props) {

    return (
        <div>     
            <div className='tripDetails'>
                <h1>{props.name}</h1>
                <h2>{props.destination}</h2>
                <h2>{props.start} - {props.end}</h2>
            </div>
            <Link to="/mytrips">
                <button>My Trips</button>
            </Link> 
        </div>
             
          
    );
}


export default TripDetails;