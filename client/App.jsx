import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Switch,
    Navigate
  } from "react-router-dom";
import './stylesheets/styles.css'
import Login from "./components/login.jsx"
import Signup from "./components/signup.jsx"
import Map from "./components/map.js"
import Nav from "./components/Nav.jsx";
import About from "./components/About.jsx";
import MyTrips from "./components/MyTrips.jsx";

// import {
//     Login,
//     Signup,
//     Nav
// } from './components.jsx';

const App = () => {
    return (
    // <Router>
        <div className="App">
        <Nav />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mytrips" element={<MyTrips />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </div>
/* </Router> */
    );
}

// const Home = () =>  {
//     <div>
//         <h1>Home Page</h1>
//     </div>
// }

export default App;