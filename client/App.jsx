import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Switch,
    Navigate
  } from "react-router-dom";
import './stylesheets/styles.css';
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
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
    <Router>
        <div className="App">
        <Nav />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/about" exact component={About} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/mytrips" component={MyTrips} />
          </Switch>
        </div>
    </Router>
    );
}

// const Home = () =>  {
//     <div>
//         <h1>Home Page</h1>
//     </div>
// }

export default App;