import Dropdown from "./components/Dropdown";
import Viz from "./components/Viz";
import React from "react";
import { useState } from "react";
import mbbdata from "../src/data/mbbdata.json";
import DateFilter from "./components/DateFilter";
import dayjs from "dayjs";

function App() {
  const [player, setPlayer] = useState("Lance Terry");
  const [date, setDate] = useState(dayjs("10/01/2022"));
  var playerData = [];
  var totalData = [];

  var sumx = 0;
  var sumy = 0;
  mbbdata.forEach((element) => {
    if (
      element.Player_Name === player &&
      element.Date === dayjs(date).format("D-MMM")
    ) {
      playerData.push({
        x: element.Mechanical_Load,
        y: element.Physio_Load,
        day: element.Date,
      });
    } else if (element.Player_Name === player) {
      totalData.push({
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
      x: Math.round(sumx / totalData.length),
      y: Math.round(sumy / totalData.length),
      day: "average",
    },
  ];

  console.log(dayjs(date).format("D-MMM"));
  console.log(date.$d.toDateString());
  console.log(playerData);

  return (
    <div>
      <div className="header">
        <div className="header_component">
          <h1>App</h1>
          <div className="dropdown">
            <Dropdown player={player} setPlayer={setPlayer} />
          </div>
          <br></br>
          <div className="dateFilter">
            <DateFilter date={date} setDate={setDate} />
          </div>
        </div>
        <div className="header_text">
          Mechanical Load: jumps, accelerates, decelerates, etc.
          <br />
          <br />
          Physio Load: just jogging around on the court.
          <br />
          <br />
          Ideally, we want the the player's Mechanical Load to be high so that we know he is working hard.
          <br />
          <br />A high Physio Load and a low Mechanical Load is a red flag
          because the players is not working hard.
        </div>
      </div>
      <div className="viz">
        <Viz
          player={player}
          playerData={playerData}
          averageData={averageData}
        />
      </div>
    </div>
  );
}

export default App;
