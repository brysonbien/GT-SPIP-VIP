import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Dropdown from "./components/Dropdown";
import Viz from "./components/Viz";
import mbbdata from "./data/mbbdata.json";

export default function Dashboard() {
	const [person, setPerson] = useState("Lance Terry");
	const [mpGraph, setmpGraph] = React.useState(false);
	var playerData = [];

	var sumx = 0;
	var sumy = 0;
	mbbdata.forEach((element) => {
		if (element.Player_Name === person) {
			playerData.push({
				x: element.Mechanical_Load,
				y: element.Physio_Load,
				day: element.Date,
			});
			sumx += element.Mechanical_Load;
			sumy += element.Physio_Load;
		}
	});

	var averageData = [
		{
			x: Math.round(sumx / playerData.length),
			y: Math.round(sumy / playerData.length),
			day: "average",
		},
	];
	//brayden daniels is broken
	return (
		<>
			<h1 className="viz">Dashboard</h1>
			<div>
				<div class="graphOptionDiv">
					<button
						type="submit"
						class="btnMechPhysio"
						onClick={() => setmpGraph(!mpGraph)}
					>
						Mechanical vs Physio Graph
					</button>
					<button type="submit" class="btnPhases">
						Phases Graph
					</button>
				</div>
				{mpGraph && (
					<div>
						<h1 className="viz">Mechanical vs Physio Graph</h1>
						<div className="dropdown">
							<Dropdown player={person} setPlayer={setPerson} />
						</div>
						<div className="viz">
							<Viz
								player={person}
								playerData={playerData}
								averageData={averageData}
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
