import React, { useEffect } from "react";
import data from "./Devoe_points_NonZero.csv";
import "./Dashboard.css";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
export default function Dashboard() {
  const [player, setPlayer] = React.useState("Select a player: ");
  const handlePlayerChange = (event) => {
    setPlayer(event.target.value);
  };

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <select class="selectPlayers" value={value} onChange={onChange}>
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

  useEffect(() => {
    var margin = { top: 30, right: 40, bottom: 30, left: 50 },
      width = 1300,
      height = 270 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y-%m-%d").parse;

    var x = d3.time.scale().range([0, width]);
    var y0 = d3.scale.linear().range([height, 0]);
    var y1 = d3.scale.linear().range([height, 0]);

    //var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxisLeft = d3.svg.axis().scale(y0).orient("left").ticks(5);

    var yAxisRight = d3.svg.axis().scale(y1).orient("right").ticks(5);

    const formatTime = d3.time.format("%m.%d");

    //console.log(avg);

    var valueline = d3.svg
      .line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y0(d.Points);
      });

    var valueline2 = d3.svg
      .line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y1(d.Distance);
      });

    var avgPointsLine = d3.svg
      .line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y0(d.AvgPoints);
      });

    var avgDistanceLine = d3.svg
      .line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y1(d.AvgDistance);
      });

    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv(data, function (error, data) {
      var pointsSum = 0;
      var distanceSum = 0;

      var avg = true;

      data.forEach(function (d) {
        d.date = parseDate(d.Date);
        d.points = d.Points;
        d.distance = d.Distance;
        d.avgPoints = d.AvgPoints;
        d.avgDistance = d.AvgDistance;
        pointsSum += parseFloat(d.Points);
        distanceSum += parseFloat(d.Distance);
      });

      var avgPoints = pointsSum / data.length;
      var avgDistance = distanceSum / data.length;
      console.log(avgPoints);
      console.log(avgDistance);

      const tickValuesForAxis = data.map((d) => parseDate(d.Date));
      var xAxis = d3.svg
        .axis()
        .scale(x)
        .orient("bottom")
        .tickValues(tickValuesForAxis)
        .tickFormat(function (d) {
          return formatTime(d);
        });

      // Scale the range of the data
      x.domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      );
      y0.domain([
        0,
        d3.max(data, function (d) {
          return Math.max(d.points);
        }),
      ]);
      y1.domain([
        0,
        d3.max(data, function (d) {
          return Math.max(d.distance);
        }),
      ]);

      svg
        .append("path") // Add the valueline path.
        .style("stroke", "steelblue")
        .style("fill", "none")
        .attr("d", valueline(data));

      svg
        .append("path") // Add the valueline2 path.
        .style("stroke", "red")
        .style("fill", "none")
        .attr("d", valueline2(data));

      console.log(avg);
      svg
        .append("path")
        .style("opacity", 0.5)
        .style("stroke", "steelblue")
        .style("fill", "none")
        .attr("d", avgPointsLine(data));

      svg
        .append("path")
        .style("fill", "none")
        .style("opacity", "0.5")
        .style("stroke", "red")
        .attr("d", avgDistanceLine(data));

      svg
        .append("g") // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg
        .append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(yAxisLeft);

      svg
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + " ,0)")
        .style("fill", "red")
        .call(yAxisRight);
    });
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      <div>
        <div class="Row">
          <Dropdown
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

          <label class="dateRangeLabel">
            <label>Date Range (MM/DD/YYYY):</label>
            <input id="startDate" />
            <input id="endDate" />
          </label>
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
          <AwesomeButton type="submit" class="savedGenerationBtn">
            Saved Generation 1
          </AwesomeButton>{" "}
          <br /> <br />
          <button type="submit" class="savedGenerationBtn">
            Saved Generation 2
          </button>
        </div>
      </div>
      <div id="chart"></div>
    </>
  );
}
