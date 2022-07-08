import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import {
    Link, 
    useNavigate,
    useParams
} from 'react-router-dom';





function Trip (props) {
    return (
         <div className='myTripBox'>
            <button>
            <Link to={`/mytrips/${props.trip_id}`}>
                <h1>Trip Name: {props.name}</h1>
                <h3>Location: {props.destination}</h3>
                <h3>Date: {props.start} - {props.end}</h3>
            </Link>  
            </button>
        </div>
    );
}


export default Trip;