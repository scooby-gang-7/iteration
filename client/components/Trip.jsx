import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import TripDetails from './TripDetails';
import {
    Link, 
    useNavigate
} from 'react-router-dom';

function Trip (props) {

    //I DONT THINK WE CAN HAVE ANOTHER COMPONENT RENDER WITHIN THIS CODEBLOCK
    // function handleSubmit(props) {
    //     return (
    //         <TripDetails key={props.key} name={props.name} destination={props.destination} start={props.start} end={props.end}/>
    //     )
    // }
    
    return (
        <div>     
            <button className='addTripButton' onClick={handleSubmit}>
                <h1>Trip Name: {props.name}</h1>
                <h3>Location: {props.destination}</h3>
                <h3>Date: {props.start} - {props.end}</h3>
            </button>
        </div>
    );
}


export default Trip;