import React, { Component, useState } from 'react';
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
import Nav from "./components/Nav.jsx";
import About from "./components/About.jsx";
import MyTrips from "./components/MyTrips.jsx";
import AddTrip from "./components/AddTrip.jsx"

// import {
//     Login,
//     Signup,
//     Nav
// } from './components.jsx';

const App = () => {
  
  const [userInfo, setUserInfo] = useState("");
  console.log('User Info --> ', userInfo);
  
    return (
      <div className="App">
        <Nav />
        <Routes>
            <Route path="/" element={<Login setUserInfo={setUserInfo}/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/mytrips" element={<MyTrips userinfo={userInfo}/>} />
            <Route path="/addtrip" element={<AddTrip userinfo={userInfo}/>} />
        </Routes>
      </div>
    );
}

// const Home = () =>  {
//     <div>
//         <h1>Home Page</h1>
//     </div>
// }

export default App;