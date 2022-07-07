import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import Mapp from './map'
import {
    Link, 
    useNavigate
} from 'react-router-dom';
import axios from 'axios';

function Trip (props) {
    console.log('trip props:', props);
    
    const [showDetail, setShowDetail] = useState(false);
    const [center, setMapCenter] = useState(null);
    console.log(center);

    function handleSubmit() {
        let apikey = 'AIzaSyCHiRhiBXEfG9PCnAMeHI6qPuyupL02i78';
        let query = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + props.destination + '&key=' + apikey;
        axios.get(query)
        .then(res => {
            console.log(res.data);
            if (res.data.status == 'OK') {
                console.log(res.data.results[0]);
                setMapCenter(res.data.results[0].geometry.location);
                setShowDetail(showDetail ? false : true);
            }
        }).catch(e => {
            console.log(e);
        })
    }
    
    return (
        <div>     
            <button className='addTripButton' onClick={handleSubmit}>
                <h1>Trip Name: {props.name}</h1>
                <h3>Location: {props.destination}</h3>
                <h3>Date: {props.start} - {props.end}</h3>
            </button>
            {showDetail ? <Mapp destination={props.destination} center={center}/> : <div></div>}
        </div>
    );
}


export default Trip;