import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BotonSemestre(props) {
  const [anio, setAnio] = React.useState(Valor(props.vpd));

  const handleChange = (event) => {
    setAnio(event.target.value);
    props.Cambio(event.target.value);
  };



  function Valor(param){

    if (param===undefined){return '';}
    return param;
  }

  return (
    
      
      
        <Select
          value={anio}
          onChange={handleChange}
          displayEmpty
          //inputProps={{ 'aria-label': 'Without label' }}
        >
           <MenuItem value="">
            Semestre
          </MenuItem>
          <MenuItem value={'1'}>1</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'5'}>5</MenuItem>
          <MenuItem value={'6'}>6</MenuItem>
          <MenuItem value={'7'}>7</MenuItem>
          <MenuItem value={'8'}>8</MenuItem>
          <MenuItem value={'9'}>9</MenuItem>
          <MenuItem value={'10'}>10</MenuItem>
          
        
        </Select>
      
    
  );
}












