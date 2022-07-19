import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddTrip from './components/AddTrip.jsx';
import Login from './components/Login.jsx';
import MyTrips from './components/MyTrips.jsx';
import NavBar from './components/NavBar';
import Signup from './components/Signup.jsx';
import TripDetails from './components/TripDetails.jsx';
import './stylesheets/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './stylesheets/styles.css';

const App = () => {
  const [userInfo, setUserInfo] = useState({ user_id: null });
  const [tripInfo, setTripInfo] = useState([]);

  //conditional check on localstorage to grab user_id;
  const session_id = JSON.parse(localStorage.getItem('session_id'));

  //fetch to update userInfo on start
  //checking if user is already logged in? and if yes, then continue to my trips???
  useEffect(() => {
    if (window.localStorage.getItem('session_id')) {
      axios
        .get('/auth/session', {
          params: {
            session_id,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          console.log('data from session_id', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  }, []);

  return (
    <div className='App'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar setUserInfo={setUserInfo} userInfo={userInfo} />
      <Routes>
        <Route
          path='/'
          element={
            userInfo.user_id ? (
              <Navigate to='/mytrips' />
            ) : (
              
              <Login setUserInfo={setUserInfo} userInfo={userInfo} />
            )
          }
        />

        <Route
          path='/signup'
          element={<Signup setUserInfo={setUserInfo} userInfo={userInfo} />}
        />
        <Route
          path='/addtrip'
          element={<AddTrip userInfo={userInfo} setTripInfo={setTripInfo} />}
        />
        <Route
          path='/mytrips'
          element={
            <MyTrips
              userInfo={userInfo}
              tripInfo={tripInfo}
              setTripInfo={setTripInfo}
            />
          }
        />
        <Route path='/mytrips/:id' element={<TripDetails userInfo = {userInfo}/>} />
      </Routes>
    </div>
  );
};

export default App;
