import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";
import './stylesheets/styles.css';
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Map from "./components/map.jsx";
import Nav from "./components/Nav.jsx";
import About from "./components/About.jsx";
import MyTrips from "./components/MyTrips.jsx";
import AddTrip from "./components/AddTrip.jsx";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  const [userInfo, setUserInfo] = useState({user_id:null});
  const [tripInfo, setTripInfo] = useState([]);

  //conditional check on localstorage to grab user_id;
  const session_id = JSON.parse(localStorage.getItem('session_id'));

  //fetch to update userInfo on start
  useEffect (() => {
    axios.get('http://localhost:3000/session', {
      params: {
        session_id
      }
    })
    .then(data => data.json())
    .then(data => {
      setUserInfo(data);
    })
    .catch(err => {
      console.log({err});
    })
  }, [userInfo])

  
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
          pauseOnHover />
        <Routes>
            <Route path="/" element={session_id ? <Navigate to='/mytrips'/> : <Login setUserInfo={setUserInfo} userInfo={userInfo}/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/signup" element={<Signup setUserInfo={setUserInfo} userInfo={userInfo} />} />
            <Route path="/mytrips" element={<MyTrips userInfo={userInfo} tripInfo={tripInfo} setTripInfo={setTripInfo}/>} />
            <Route path="/addtrip" element={<AddTrip userInfo={userInfo} /> } />
            <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    );
}

export default App;