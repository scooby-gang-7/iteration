import React, { useState } from "react";
import '../stylesheets/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    Link,
    useNavigate
  } from 'react-router-dom';

// CHECK WITH JOY ON CONNECTING GOOGLE API MAPS WITH DESTINATION FORM

function AddTrip(props) {

    const { userInfo } = props;

    //react hooks to save trip info
    const [trip_name, setTripName] = useState("");
    const [description, setDescription] = useState("");
    const [destination, setDestination] = useState("");
    const [date_start, setDateStart] = useState("");
    const [date_end, setDateEnd] = useState("");
    const navigate = useNavigate();

    const handleSubmitAddTrip = (e) => {
        e.preventDefault(); //prevents re-render --> do we need this?
        fetch('http://localhost:3000/addtrip', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                trip_name,
                description,
                destination,
                date_start,
                date_end,
                user_id: userInfo.user_id
            })
            })
            .then(data => data.json())
            .then(data => {
                console.log('in success state');
                toast.success('Trip added successfully');
                navigate('/mytrips', { replace: true});
                console.log(data);
            }).catch((e) => {
                //pop-up error handling instance 
                toast.error('Trip added unsuccessfully');
                console.log({e});
            })

} 

    return (
        <div id='addtrip-parent'>
            <form action="#">
                <h3>Add Trip Details</h3>
                <div>
                    <label>Trip Name:  </label>
                    <input type="text"  placeholder='trip name' name='trip_name' value={trip_name} onChange={e => setTripName(e.target.value)} />
                </div>
                <div>
                    <label>Description:  </label>
                    <input type="text" placeholder='description' name='description' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Destination:  </label>
                    <input type="text"  placeholder='destination' name='destination' value={destination} onChange={e => setDestination(e.target.value)} />
                </div>
                <div>
                    <label >Start Date:  </label>
                    <input type="date" id="start" name='date_start' value={date_start} onChange={e => setDateStart(e.target.value)} />
                </div>
                <div>
                    <label >End Date:  </label>
                    <input type="date" id="end" name='date_end' value={date_end} onChange={e => setDateEnd(e.target.value)} />
                </div>
                <br />
                <button className='' onClick={handleSubmitAddTrip}>Submit</button>
            </form>
        </div>
    )
}


export default AddTrip; 