import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BotonEstados() {
  const [age, setAge] = React.useState('Cursando');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          //inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={'Cursando'}>Cursando</MenuItem>
          <MenuItem value={'Regular'}>Regular</MenuItem>
          <MenuItem value={'Aprobado'}>Aprobado</MenuItem>
          <MenuItem value={'Promocionado'}>Promocionado</MenuItem>
          <MenuItem value={'Libre'}>Libre</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}












