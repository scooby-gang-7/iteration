import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import {Link} from 'react-router-dom';
import thumbsUp from '../assets/thumbsup.png'
import thumbsDown from '../assets/thumbsdown.png'

function Row(props) {

    function handleClick(e) {
        e.preventDefault();
        console.log('e.target --> ',e.target)
        const body = {
            place_id: props.place_id,
            up_vote: 0,
            down_vote: 0
        }
        
        e.target.id == 'upVote' ? body.up_vote += 1 : body.down_vote += 1;
        
        fetch('http://localhost:3000/vote', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(data => data.json())
            .then(data => console.log(data))
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <tr>
            {/* <div>
                <th>{props.name}</th>
            </div> */}
            <div>
            {props.name}
               <img onClick={handleClick} id="upVote" src={thumbsUp} />
                <img id="downVote" src={thumbsDown} onClick={handleClick}/>
                <p className="count">{props.up_vote}</p>
                <p className="count">{props.down_vote}</p>
            </div>
        </tr>
    )

}

export default Row;