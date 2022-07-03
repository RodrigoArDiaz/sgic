import React from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';



export const ExamenCorEnc = (props) => {
    //Variable de estado y handles de eventos para la ventana modal
    
    const [enunciados, setEnc] = React.useState('');
    const [correcciones, setCor] = React.useState('');
    
    const handleEnc = (event) => {
        setEnc(event.target.value);
       
        props.CambioEnc(event.target.value);
      };


      const handleCor = (event) => {
        setCor(event.target.value);
       
        props.CambioCor(event.target.value);
      };


    return (
    
            <Grid container
              pt={2}
              justifyContent="flex-start"  spacing={2}>
 
        
      <Grid item xs={6} >
        <TextField 
          id="outlined-multiline-static1"
          label="Enunciado"
          multiline
          fullWidth
          color="success"
          
          rows={2}
          value={enunciados}
          onChange={handleEnc}
          //defaultValue="Default Value"
        />
</Grid>

<Grid item xs={6} >
<TextField sx={{mr: 1}}
          id="outlined-multiline-static2"
          label="Correcciones"
          multiline
          fullWidth
          rows={2}
          value={correcciones}
          onChange={handleCor}
          //defaultValue="Default Value"
        />
</Grid>
      

            </Grid>
  
        )
}
