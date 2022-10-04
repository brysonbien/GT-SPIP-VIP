import React from 'react';
import Login from '../Login/Login';
import gtmensbasketballbanner from "../Homepage/gtmensbasketballbanner.png"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export default function Homepage() {
    return ( 
        <div className='home test' style = {{backgroundImage: `url(${gtmensbasketballbanner})` }}>
            
            <Link to="/login">
                <button type="submit" className="NextPage">
                    Next Page
                </button>{" "}
            </Link>
            <div className='welcome'>
                Welcome to the Sports Intelligence Platform made by Georgia Tech's VIP Program!
            </div>

        </div>
        
        
    );
}