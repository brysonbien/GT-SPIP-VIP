import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {playerList} from "../data/players"


function Dropdown({player, setPlayer}) {
  

  const handleChange = (event) => {
    setPlayer(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Player</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={player}
          label="Player"
          onChange={handleChange}
        >
          {playerList.map(function(player){
            return <MenuItem key={player.number} value={player.name}>{"#" + player.number + " " + player.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown;