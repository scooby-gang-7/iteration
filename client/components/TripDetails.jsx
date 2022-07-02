import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import {Link} from 'react-router-dom';



// trip name should pull in from DB trip_name - need to get syntax for this from SQL table



function Trip () {
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