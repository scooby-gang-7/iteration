import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";
import './stylesheets/styles.css'
import Login from "./components/login.jsx"
import Signup from "./components/signup.jsx"
import Map from "./components/map.js"

// function appTheme () {
//     const pageStyle = {
//         color: 'white' 
//     }
// }

const App = () => {
    return (
        <div id="header">
            <Map />
        </div>
    );
}

export default App;