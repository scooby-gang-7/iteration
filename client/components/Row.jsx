import React, {useState, useEffect} from 'react';
import '../stylesheets/styles.css'
import {Link} from 'react-router-dom';

function Row() {

    return (
        <tr>
            <button class="thumb"><img src="./assets/thumbsup.png" /></button>
            <button class="thumb"><img src="./assets/thumbsup.png" /></button>
            <p class="count">0</p>
            <p class="count">0</p>
        </tr>
    )

}

export default Row;