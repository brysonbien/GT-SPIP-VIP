import React, { useState } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

async function loginUser(credentials) {
	return fetch("http://localhost:8080/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

export default function Login({ setToken }) {
	const [username, setUserName] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await loginUser({
			username,
			password,
		});
		setToken(token);
	};
	return (
		<div className="login-wrapper">
			<h1 className="pageText">LOGIN:</h1>
			<br />
			<form onSubmit={handleSubmit}>
				<label>
					<p id="user" className="pageText">
						Username:
					</p>
					<input
						id="user"
						type="text"
						onChange={(e) => setUserName(e.target.value)}
					/>
				</label>
				<br />
				<label>
					<p id="pass" className="pageText">
						Password:
					</p>
					<input
						id="pass"
						className="passInput"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<div className="btnSubmit">
					<BrowserRouter>
						<Link to="/dashboard">
							<button type="submit" className="loginButtons">
								Log in
							</button>{" "}
							<br /> <br />
						</Link>
					</BrowserRouter>
				</div>
			</form>
		</div>
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};
