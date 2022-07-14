import React, { Component, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
} from 'react-router-dom';
import './stylesheets/styles.css';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Map from './components/map.jsx';
import NavSignIn from './components/Nav-Signed-Out.jsx';
import NavSignedIn from './components/Nav-Signed-In.jsx';
import NavSignUp from './components/Nav-Sign-Up.jsx';
import About from './components/About.jsx';
import MyTrips from './components/MyTrips.jsx';
import AddTrip from './components/AddTrip.jsx';
import TripDetails from './components/TripDetails.jsx';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [userInfo, setUserInfo] = useState({ user_id: null });
  const [tripInfo, setTripInfo] = useState([]);

  //conditional check on localstorage to grab user_id;
  const session_id = JSON.parse(localStorage.getItem('session_id'));
  const isInitialMount = useRef(true);

  // console.log('app props userInfo', userInfo);

  //fetch to update userInfo on start
  useEffect(() => {
    if (isInitialMount.current && window.localStorage.getItem('session_id')) {
      axios
        .get('/auth/session', {
          params: {
            session_id,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          isInitialMount.current = false;
          console.log('data from session_id', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  });

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/signup'
          element={
            userInfo.user_id ? (
              <NavSignedIn setUserInfo={setUserInfo} userInfo={userInfo} />
            ) : (
              <NavSignUp />
            )
          }
        />
        <Route
          path='/*'
          element={
            userInfo.user_id ? (
              <NavSignedIn setUserInfo={setUserInfo} userInfo={userInfo} />
            ) : (
              <NavSignIn />
            )
          }
        />
      </Routes>
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
        <Route path='/about' element={<About />} />
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
        <Route path='/mytrips/:id' element={<TripDetails />} />
        <Route path='/map' element={<Map />} />
      </Routes>
    </div>
  );
};

export default App;
