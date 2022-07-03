import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

export default function ECVisual(props) {
  
  //const [texto, setT] = React.useState(props.valor);
  return (
    
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={props.valor}
            size="small"
            
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
                readOnly: true,
            }}
          />
          
        </FormControl>    


       
            
  );
}


/*
 <TextField
          id="outlined-read-only-input"
          //label="Read Only"
          defaultValue={props.valor}
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />
*/