import React, { useState, useEffect } from 'react';
import '../stylesheets/styles.css';

const Addbuddy = (props) => {
    const { trip_id }  = props;
    const [buddy_email, setBuddyemail] = useState('');
    const [trip_buddy, setTripbuddy] = useState([]);
    console.log(console.log('tripbuddy info', trip_buddy));
    
    useEffect(() => {
        fetch('http://localhost:3000/getbuddy', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                trip_id,
            })
            })
            .then(data => data.json())
            .then(data => {
                setTripbuddy(data);            
            }).catch((e) => {
                console.log({e});
            })
    }, [trip_id]);

    const handleAddBuddy = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/addbuddy', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                trip_id,
                buddy_email,
            })
            })
            .then(data => data.json())
            .then(data => {
                setTripbuddy(data);            
            }).catch((e) => {
                console.log({e});
            })
    };

    const tripmembers = [<p>Trip members: </p>];
    trip_buddy.forEach(el => {
        tripmembers.push(<p>{el.name_first}</p>);
    })

    return (
        <div id='addbuddy_container'>
            <div id='mytrip buddy'>
                {tripmembers}
            </div>
            <div>
                <input type="text" placeholder={`Enter Your Friend's Email`} onChange={e => setBuddyemail(e.target.value)} />
                <button onClick={handleAddBuddy}>AddBuddy</button>
            </div>
        </div>
    )

}

export default Addbuddy;