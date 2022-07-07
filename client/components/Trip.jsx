import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import {Link} from 'react-router-dom';

// child component in boxes for each trip --> only includes trip_name, destination, date_start to date_end, ((MAYBE WHO COMES WITH))

function Trip (props) {

    console.log('Trip info ->', props.triplist);

    //trip_name={trip_name} destination={destination} date_start={date_start} date_end={date_end}
    
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


export default Trip;