import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import TripDetails from './TripDetails';
import Map from './map'
import {
    Link, 
    useNavigate,
    useParams
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
    
    const startDate = new Date(props.start)
    const startDateDisplay = `${startDate.getMonth()+1}/${startDate.getDate()}/${startDate.getFullYear()}`
    const endDate = new Date(props.end)
    const endDateDisplay = `${endDate.getMonth()+1}/${endDate.getDate()}/${endDate.getFullYear()}`

    return (
         <div className='myTripBox'>
            <button>
            <Link to={`/mytrips/${props.trip_id}`}>
                <h1>{props.name}</h1>
                <h3>{props.destination}</h3>
                <h3>{startDateDisplay} - {endDateDisplay}</h3>
            </Link>  
            </button>
            {showDetail ? <Mapp destination={props.destination} center={center}/> : <div></div>}
        </div>
    );
}


export default Trip;