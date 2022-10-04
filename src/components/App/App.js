import React, { useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';
import Homepage from '../Homepage/Homepage';
import gtmensbasketballbanner from "../Homepage/gtmensbasketballbanner.png"



function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className='bar'>
      <div className="bar">
        <h1>Sports Intelligence Platform</h1>
      </div>
      <div className="home">
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;