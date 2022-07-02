import React from 'react';
import '../stylesheets/styles.css'

// CHECK WITH JOY ON CONNECTING GOOGLE API MAPS WITH DESTINATION FORM

function AddTrip() {
    return (
        <div id='addtrip-parent'>
            <form action="#" method='POST' onSubmit={console.log('signed-in')}>
                <h3>Add Trip Details</h3>
                <div>
                    <label>Trip Name:  </label>
                    <input type="text" placeholder='trip name' name='name_first' />
                </div>
                <div>
                    <label>Destination:  </label>
                    <input type="text"  placeholder='destination' name='name_last'/>
                </div>
                <div>
                    <label for="start">Start Date:  </label>
                    <input type="date" id="start" name='date_start' />
                </div>
                <div>
                    <label for="end">End Date:  </label>
                    <input type="date" id="end" name='date_end' />
                </div>
                <br />
                <button className=''>Submit</button>
            </form>
        </div>
    )
}


export default AddTrip; 