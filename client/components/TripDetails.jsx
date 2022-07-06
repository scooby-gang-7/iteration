import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import {Link} from 'react-router-dom';



// Trip Details is the overarching pop-up window that includes ALL the trip info / suggestions. UPVOTE and DOWNVOTE functionality.



function Trip (props) {
    return (
        <div>
            <Link to="/addtrip">      
            <button className='addTripButton'>
                <h1>{/* name of trip*/ /*this.state.trip_name*/}TRIP NAME</h1>
                <h3>{/* name of trip*/ /*this.state.trip_location*/}LOCATION</h3>
                <h3>{/* name of trip*/ /*this.state.trip_date, this.state.trip_date*/}START DATE - END DATE</h3>
            </button>
            </Link>
        </div>
             
          
    );
}


export default TripDetails;