import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import Mapp from './map'
import {
    Link, 
    useNavigate
} from 'react-router-dom';

function Trip (props) {
    console.log('trip props:', props);
    
    const [showDetail, setShowDetail] = useState(false);

    function handleSubmit() {
        setShowDetail(showDetail ? false : true);
    }
    
    return (
        <div>     
            <button className='addTripButton' onClick={handleSubmit}>
                <h1>Trip Name: {props.name}</h1>
                <h3>Location: {props.destination}</h3>
                <h3>Date: {props.start} - {props.end}</h3>
            </button>
            {showDetail ? <Mapp destination={props.destination}/> : <div></div>}
        </div>
    );
}


export default Trip;