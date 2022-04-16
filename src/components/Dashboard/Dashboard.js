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
    return(
        <><h2>Dashboard</h2>
        <div>
            <div class = "Row">

                <button type="submit" class="btnPrint">Print</button>
                <button type="submit" class="btnGenerate">Generate</button> 
              
               
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
                    <input />
                    <input />
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
