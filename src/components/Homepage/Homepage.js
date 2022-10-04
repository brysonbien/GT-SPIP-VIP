import React from 'react';
import Login from '../Login/Login';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export default function Homepage() {
    return(
        <div className="home" style = {{ }}>
            <div className="headerContainer">
                <h1 className="homepageTitle">
                    
                </h1>
			    <br />
                <div className="btnSubmit">
				<Link to="/login">
					<button type="submit" className="loginButtons">
						Next Page
					</button>{" "}
				</Link>
			    </div>
            </div>
		</div>
    );
}