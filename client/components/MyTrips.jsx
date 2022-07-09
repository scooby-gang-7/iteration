import React, { useState, useEffect } from 'react';
import '../stylesheets/styles.css'
import AddTrip from './AddTrip'
import { Link } from 'react-router-dom';
import Trip from './Trip'

// INCLUDE MAP API
function MyTrips(props) {
    // console.log('My trip props ->', props);
    // console.log('My trip info ->', props.tripInfo);

    //on loading, fetch request to get all the trips info for the user
    useEffect(() => {
        fetch('http://localhost:3000/gettrips/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: props.userInfo.user_id
            })
        })
            .then(triplist => triplist.json())
            .then(triplist => {
                props.setTripInfo(triplist);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    const today = new Date()

    return (
        <div id="myTrips">
            <br />
            {/* {props.tripInfo.map((trip) => {
                return <Trip key={trip.trip_id} trip_id={trip.trip_id} name={trip.trip_name} destination={trip.destination} start={trip.date_start} end={trip.date_end}/>
                <Link to="/addtrip">
                    <button className='addTripButton'>Add New Trip</button>
                </Link> */}
            <Link to="/addtrip">
                <button className='addTripButton'>Add New Trip</button>
            </Link>
            <h1>Upcoming Trips</h1>
            <br />
                {
                    props.tripInfo
                    // filter out past trips
                    .filter((trip) => {
                        const tripStart = new Date(`${trip.date_start}`)
                        return tripStart.getTime() >= today.getTime()
                    })
                    // sort trips by start date, if start date is the same, sort by end date
                    .sort((a, b) => {
                        if (a.date_start > b.date_start) return 1
                        else if (a.date_start < b.date_start) return -1
                        else if (a.date_start === b.date_start) {
                            return a.date_end > b.date_end ? 1 : -1
                        }
                    })
                    .map((trip) => {
                        return <Trip key={trip.trip_id} trip_id={trip.trip_id} name={trip.trip_name} destination={trip.destination} start={trip.date_start} end={trip.date_end} />
                    })
                }
            <br />
            <h1>Past Trips</h1>
            <br />
                {
                    props.tripInfo
                    // filter out current and future trips
                    .filter((trip) => {
                        const tripStart = new Date(`${trip.date_start}`)
                        return tripStart.getTime() < today.getTime()
                    })
                    // sort trips by start date, if start date is the same, sort by end date
                    .sort((a, b) => {
                        if (a.date_start > b.date_start) return 1
                        else if (a.date_start < b.date_start) return -1
                        else if (a.date_start === b.date_start) {
                            return a.date_end > b.date_end ? 1 : -1
                        }
                    })
                    .map((trip) => {
                        return <Trip key={trip.trip_id} trip_id={trip.trip_id} name={trip.trip_name} destination={trip.destination} start={trip.date_start} end={trip.date_end} />
                    })
                }
                <br />
        </div>


    );
}


export default MyTrips;