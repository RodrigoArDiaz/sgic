import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BotonTipoExamen(props) {
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
    <Box sx={{ minWidth: 50 }}>
      <FormControl fullWidth>
      
        <Select
          value={anio}
          onChange={handleChange}
          displayEmpty
          //inputProps={{ 'aria-label': 'Without label' }}
        >
           <MenuItem value="">
            Tipo
          </MenuItem>
          
          <MenuItem value={'Q'}>Quiz</MenuItem>
          <MenuItem value={'P'}>Parcial</MenuItem>
          <MenuItem value={'F'}>Final</MenuItem>
          


        </Select>
      </FormControl>
    </Box>
  );
}












