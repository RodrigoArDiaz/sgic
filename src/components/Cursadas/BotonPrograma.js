

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
//import {AltaGrupo} from './AltaGrupo';
//import {BajaGrupo} from './BajaGrupo';

import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import {  Grid } from '@mui/material';

import { useNavigate } from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress';

export const BotonPrograma = (props) => {

  const navegar = useNavigate();
    const [salto, setSalto] = React.useState(props.programa); 


    async function consultas(data, cadena){

      const response = await fetch(cadena,
      {
          method: 'POST', 
          body: JSON.stringify(data), 
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
  
           return response.json();
  }


    function manejador(){
        
      var data = {
        IdCursada:props.idcursada,}


    if (salto ==='A'){
      setSalto('C');
      consultas(data,'http://127.0.0.1:8000/api/bajacursada').then(response=>{
      
        if (response.Error===undefined){
          setSalto('B');  
        }
        else {
          console.log(response.Error)
        }
                
        })
        .catch(error=>{console.log("Error de conexión"+error);
          navegar("/registrarse");
      });
      
      //setSalto('B'); 
}

else {
    if (salto ==='B'){
      setSalto('C');
      consultas(data,'http://127.0.0.1:8000/api/altacursada').then(response=>{
      
        if (response.Error===undefined){
          setSalto('A');  
        }
        else {
          console.log(response.Error)
        }       
        })
        .catch(error=>{console.log("Error de conexión"+error);
          navegar("/registrarse");
      });
      
    //  setSalto('A');
    }

  }


}




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
  {(salto==='C') &&<Grid item xs={12} sm="auto">
<Tooltip title="Verificando">
<IconButton aria-label="estado3"  size='small' color="inherit"  onClick={()=>manejador()}>
        <CircularProgress />
      </IconButton>
      </Tooltip>
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
