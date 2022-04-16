import React from 'react';
import './Dashboard.css';
import PropTypes from 'prop-types';
export default function Dashboard() {
    const [player, setPlayer] = React.useState('Select a player: ');
    const handlePlayerChange = (event) => {
      setPlayer(event.target.value);
    };
  
    const Dropdown = ({ label, value, options, onChange }) => {
        return (
            <select class = "selectPlayers" value={value} onChange={onChange}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
        );
      };
      function isValidDate(dateString)
      {
          // First check for the pattern
          if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
              return false;
      
          // Parse the date parts to integers
          var parts = dateString.split("/");
          var day = parseInt(parts[1], 10);
          var month = parseInt(parts[0], 10);
          var year = parseInt(parts[2], 10);
      
          // Check the ranges of month and year
          if(year < 1000 || year > 3000 || month == 0 || month > 12)
              return false;
      
          var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      
          // Adjust for leap years
          if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
              monthLength[1] = 29;
      
          // Check the range of the day
          return day > 0 && day <= monthLength[month - 1];
      };
    function handleQuery() {
      const queryList = []
      const startDate = document.getElementById("startDate").value
      const endDate = document.getElementById("endDate").value
      var lengthCondition = (startDate.length == 10 && endDate.length == 10)
      var formatCondition = (isValidDate(startDate) && isValidDate(endDate));
      if (player === "Select a player: ") {
        window.alert("Please select a player")
        return;
      }
      if (lengthCondition && formatCondition) {
        var sequentialCondition = (Date.parse(startDate) < Date.parse(endDate));
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

    return(
        <><h2>Dashboard</h2>
        <div>
            <div class = "Row">

                <button type="submit" class="btnPrint">Print</button>
                <button onClick = {(e) => handleQuery()} type="submit" class="btnGenerate">Generate</button> 
              
               
                <Dropdown
                      options={[
                      { label: 'Select a player: ' , value: 'Select a player: ' },
                      { label: 'ALL', value: '-1' },
                      { label: 'Jordan Usher', value: '4' },
                      { label: 'Khalid Moore', value: '12' },
                      { label: 'Rodney Howard', value: '24' },
                      { label: 'Michael Devoe', value:'0'},
                      { label: 'Kyle Sturdivant' , value: '1'},
                      ]}
                      value={player}
                      onChange={handlePlayerChange}
                  /> 
              
                <label class = "dateRangeLabel">
                    <label>Date Range (MM/DD/YYYY):</label>
                    <input id = "startDate"/>
                    <input id = "endDate"/>
                  </label>
                
       
                
            </div>
            <div>
                <button type="submit" class = "savedGenerationBtn" >Saved Generation 1</button> <br /> <br />
                <button type="submit" class = "savedGenerationBtn" >Saved Generation 2</button>
            </div>

        </div>
        
        
    </>
        
    );
}
