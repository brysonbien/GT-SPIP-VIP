import React, { useEffect } from "react";
import data from "./Devoe_points_NonZero.csv";
import "./Dashboard.css";
import PropTypes from "prop-types";
import * as d3 from "d3";
// import { AwesomeButton } from "react-awesome-button";
// import "react-awesome-button/dist/styles.css";
export default function Dashboard() {
	const [player, setPlayer] = React.useState("Select a player: ");
	const [date, setDate] = React.useState("Select a date: ");
	const [graph, setGraph] = React.useState("");

	const handlePlayerChange = (event) => {
		setPlayer(event.target.value);
	};

	const handleDateChange = (event) => {
		setDate(event.target.value);
	};

	const PlayerDropdown = ({ label, value, options, onChange }) => {
		return (
			<select class="selectPlayers" value={value} onChange={onChange}>
				{options.map((option) => (
					<option value={option.value}>{option.label}</option>
				))}
			</select>
		);
	};

	const DateDropdown = ({ label, value, options, onChange }) => {
		return (
			<select class="selectDates" value={value} onChange={onChange}>
				{options.map((option) => (
					<option value={option.value}>{option.label}</option>
				))}
			</select>
		);
	};

	function isValidDate(dateString) {
		// First check for the pattern
		if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

		// Parse the date parts to integers
		var parts = dateString.split("/");
		var day = parseInt(parts[1], 10);
		var month = parseInt(parts[0], 10);
		var year = parseInt(parts[2], 10);

		// Check the ranges of month and year
		if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

		var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// Adjust for leap years
		if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
			monthLength[1] = 29;

		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	}
	function handleQuery() {
		const queryList = [];
		const startDate = document.getElementById("startDate").value;
		const endDate = document.getElementById("endDate").value;
		var lengthCondition = startDate.length == 10 && endDate.length == 10;
		var formatCondition = isValidDate(startDate) && isValidDate(endDate);
		if (player === "Select a player: ") {
			window.alert("Please select a player");
			return;
		}
		if (lengthCondition && formatCondition) {
			var sequentialCondition = Date.parse(startDate) < Date.parse(endDate);
			if (sequentialCondition) {
				queryList.push(player, startDate, endDate);
				window.alert(queryList);
			} else {
				window.alert("End date must be after start date");
			}
		} else {
			window.alert("Incorrect date format, please try again.");
		}
		return queryList;
	}
	//get label (kinexon number) from Dropdown menu
	//get date range from input
	//make sure data range is valid or return error message
	//if valid store in a list separated by each section

	return (
		<>
			<h2>Dashboard</h2>
			<div>
				<div class="graphOptionDiv">
					<button type="submit" class="btnMechPhysio">
						Mechanical vs Physio Graph
					</button>
					<button type="submit" class="btnPhases">
						Phases Graph
					</button>
				</div>
				<div class="Row">
					<PlayerDropdown
						options={[
							{ label: "Select a player: ", value: "Select a player: " },
							{ label: "ALL", value: "-1" },
							{ label: "Jordan Usher", value: "4" },
							{ label: "Khalid Moore", value: "12" },
							{ label: "Rodney Howard", value: "24" },
							{ label: "Michael Devoe", value: "0" },
							{ label: "Kyle Sturdivant", value: "1" },
						]}
						value={player}
						onChange={handlePlayerChange}
					/>

					<DateDropdown
						options={[
							{
								label: "Select a date range: ",
								value: "Select a date range: ",
							},
							{ label: "This Week", value: "-1" },
							{ label: "Date Range From Last Week", value: "12" },
							{ label: "Date Range From Two Weeks Ago", value: "4" },
						]}
						value={date}
						onChange={handleDateChange}
					/>
					{/* <label class="dateRangeLabel">
						<label>Date Range (MM/DD/YYYY):</label>
						<input id="startDate" />
						<input id="endDate" />
					</label> */}
				</div>
				<div class="buttondiv">
					<button type="submit" class="btnPrint">
						Print
					</button>
					<button
						onClick={(e) => handleQuery()}
						type="submit"
						class="btnGenerate"
					>
						Generate
					</button>
					{/* <AwesomeButton type="submit" class="savedGenerationBtn">
            Saved Generation 1
          </AwesomeButton>{" "} */}
					<br /> <br />
					{/* <button type="submit" class="savedGenerationBtn">
						Saved Generation
					</button> */}
				</div>
			</div>
			<div id="chart"></div>
		</>
	);
}
