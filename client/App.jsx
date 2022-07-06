import React, { Component, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";
import './stylesheets/styles.css'
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import Map from "./components/map.js"
import Nav from "./components/Nav.jsx";
import About from "./components/About.jsx";
import MyTrips from "./components/MyTrips.jsx";
import AddTrip from "./components/AddTrip.jsx"
import 'react-toastify/dist/ReactToastify.css';


//apparently we can create a separate page where we can export an entire object of our pages rather than what we have, but it's unnecessary 

// import {
//     Login,
//     Signup,
//     Nav
// } from './components/'; 

const App = () => {
  
  const [userInfo, setUserInfo] = useState("");
  const [tripInfo, setTripInfo] = useState([]);
  
    return (
      <div className="App">
        <Nav />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
            <Route path="/" element={<Login setUserInfo={setUserInfo} userInfo={userInfo}/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/mytrips" element={<MyTrips userInfo={userInfo} tripInfo={tripInfo} setTripInfo={setTripInfo}/>} />
            <Route path="/addtrip" element={<AddTrip userInfo={userInfo} /> } />
            <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    );
}

export default App;