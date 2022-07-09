import React, { useState, useEffect } from 'react';
import '../stylesheets/styles.css'
import Mapp from './map.jsx'
import AddTrip from './AddTrip'
import TripDetails from './TripDetails';
import Map from './map'
import {
    Link, 
    useNavigate,
    useParams
} from 'react-router-dom';
import axios from 'axios';

function Trip(props) {
    console.log('trip props:', props);

    // const [showDetail, setShowDetail] = useState(false);
    // const [center, setMapCenter] = useState(null);
    // console.log(center);

    // function handleSubmit() {
    //     let apikey = 'AIzaSyCHiRhiBXEfG9PCnAMeHI6qPuyupL02i78';
    //     let query = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + props.destination + '&key=' + apikey;
    //     axios.get(query)
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.data.status == 'OK') {
    //                 console.log(res.data.results[0]);
    //                 setMapCenter(res.data.results[0].geometry.location);
    //                 setShowDetail(showDetail ? false : true);
    //             }
    //         }).catch(e => {
    //             console.log(e);
    //         })
    // }

    // return (
    //     <div>
    //         <button className='addTripButton' onClick={handleSubmit}>
    
    const startDate = new Date(props.start)
    const startDateDisplay = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()}`
    const endDate = new Date(props.end)
    const endDateDisplay = `${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`

    return (
         <div className='myTripBox'>
            <button className='addTripButton'>
            <Link to={`/mytrips/${props.trip_id}`}>
                <h1>Trip Name: {props.name}</h1>
                <h3>Location: {props.destination}</h3>
                <h3>Dates: {startDateDisplay} - {endDateDisplay}</h3>
            </Link>  
            </button>

            {/* {showDetail ? <Mapp trip_id={props.trip_id} destination={props.destination} center={center} /> : <div></div>} */}
        </div>
    );
}


export default Trip;