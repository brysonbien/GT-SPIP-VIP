import React from 'react';
import Login from '../Login/Login';
import gtmensbasketballbanner from "../Homepage/gtmensbasketballbanner.png"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "../Homepage/Homepage.css";

export default function Homepage() {
    return ( 
        //make the welcome text not right ce
        <div className="home" style={{ backgroundImage: `url(${gtmensbasketballbanner})` }}>
            <div className="headerContainer">
                <h1>Sports Intelligence Platform</h1>
        
                <p>Welcome!</p>
            <Link to="/Dashboard">
                <button> Continue </button>
            </Link>
            </div>
        </div>
        
        
    );
}