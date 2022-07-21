import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import MyTrips from './components/MyTrips.jsx';
import NavBar from './components/NavBar';
import NavBarMUI from './components/NavBarMUI';
import { Paper } from '@mui/material';
import TripDetails from './components/TripDetails.jsx';
import './stylesheets/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import FourOFour from './components/404.jsx';

const App = () => {
  const [userInfo, setUserInfo] = useState({ user_id: null });
  const [tripInfo, setTripInfo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //conditional check on localstorage to grab user_id;
  const session_id = JSON.parse(localStorage.getItem('session_id'));

  //fetch to update userInfo on start
  //checking if user is already logged in? and if yes, then continue to my trips???
  useEffect(() => {
    if (window.localStorage.getItem('session_id')) {
      console.log('trying to fetch');
      axios
        .get('/auth/session', {
          params: {
            session_id,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          setIsLoaded(true);
          console.log('data from session_id', response.data);
        })
        .catch((err) => {
          console.log('hit an error');
          console.log(err);
        });
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (isLoaded) {
    return (
      <div className='App'>
        <BrowserRouter>
          <Paper elevation={3} sx={{ maxWidth: '900px', minWidth: '500px' }}>
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
                path='/mytrips'
                element={
                  <MyTrips
                    userInfo={userInfo}
                    tripInfo={tripInfo}
                    setTripInfo={setTripInfo}
                  />
                }
              />
              <Route
                path='/mytrips/:id'
                element={<TripDetails userInfo={userInfo} />}
              />
            </Routes>
          </Paper>
        </BrowserRouter>
      </div>
    );
  }
};
export default App;
