import Dropdown from "./components/Dropdown";
import Viz from "./components/Viz";
import React from "react";
import { useState } from "react";
import mbbdata from "../src/data/mbbdata.json";

function App() {
  const [player, setPlayer] = useState("Lance Terry");
  var playerData = [];

  var sumx = 0;
  var sumy = 0;
  mbbdata.forEach((element) => {
    if (element.Player_Name === player) {
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

  return (
    <div>
      <h1>App</h1>
      <div className="dropdown">
        <Dropdown player={player} setPlayer={setPlayer} />
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
