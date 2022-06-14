

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import {  Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const BotonPrograma = (props) => {

    const [salto, setSalto] = React.useState(props.programa); 


return (<>
  {(salto === undefined) &&<Grid item xs={12} sm="auto">
<Tooltip title="Sin programa">
<IconButton aria-label="estado" size='small' color="success" >
        <CloseIcon />
      </IconButton>
      </Tooltip>
      </Grid>
  }
  {(salto!==undefined) &&<Grid item xs={12} sm="auto">
  <a href={props.programa}>Link</a>
      </Grid>
  }

  </>

);






/*
if (salto ==='A') 
{
    return (
      

        
        <Grid item xs={12} sm="auto">
<Tooltip title="Activa">
<IconButton aria-label="estado" size='small' color="success" onClick={()=>manejador()}>
        <CheckIcon />
      </IconButton>
      </Tooltip>
      </Grid>
      

  );}
*/
/*
  if (salto==='B') 
  {
      return (

        
        <Grid item xs={12} sm="auto">
<Tooltip title="Baja">
<IconButton aria-label="estado2"  size='small' color="error" onClick={()=>manejador()}>
        <CloseIcon />
      </IconButton>
      </Tooltip>
      </Grid>
     
    );}
*/

 

}
