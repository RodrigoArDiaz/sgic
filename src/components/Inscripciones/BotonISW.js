import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import {  Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as Responses from '../Responses';

export const BotonISW = (props) => {

  const navegar = useNavigate();
    const [salto, setSalto] = React.useState(props.inscripto); 


    function manejador(){
      setSalto('C'); 
      
      if(props.inscripto==='S'){
      var data = {
        pISW:'N',
                pIS:'',
        pAsis:'',
        pNota:'',
        pidCu:props.cursada.IdCursada,
      pidUs:props.alumno.IdUsuario,
      }
    }
    else{
      var data = {
        pISW:'S',
                pIS:'',
        pAsis:'',
        pNota:'',
        pidCu:props.cursada.IdCursada,
      pidUs:props.alumno.IdUsuario,
      }

    }    

    if (salto ==='S'){
      

      
      Responses.consultas(data,'http://127.0.0.1:8000/api/modificarinscripcion').then(response=>{
        if(Responses.status===200){
          
          setSalto('N');  
            }
            else if(Responses.status===401){
              navegar("/ingreso");
            }
           
            else {
              navegar("/error");
            }   
        })
        .catch(error=>{
          navegar("/error");
      });
      
     
}

else {
    if (salto ==='N'){
      
      Responses.consultas(data,'http://127.0.0.1:8000/api/modificarinscripcion').then(response=>{
        if(Responses.status===200){
          
          setSalto('S');  
            }
            else if(Responses.status===401){
              navegar("/ingreso");
            }
           
            else {
              navegar("/error");
            }
           
          
        })
        .catch(error=>{
          navegar("/error");
      });
      
    
    }

  }


}




return (<>
  {(salto==='S') &&<Grid item xs={12} sm="auto">
<Tooltip title="Inscripto">
<IconButton aria-label="estado" size='small' color="success" onClick={()=>manejador()}>
        <CheckIcon />
      </IconButton>
      </Tooltip>
      </Grid>
  }
  {(salto==='N') &&<Grid item xs={12} sm="auto">
<Tooltip title="No inscripto">
<IconButton aria-label="estado2"  size='small' color="error" onClick={()=>manejador()}>
        <CloseIcon />
      </IconButton>
      </Tooltip>
      </Grid>
  }
  {(salto==='C') &&<Grid item xs={12} sm="auto">
<Tooltip title="Cargando">
<IconButton aria-label="estado3"  size='small' color="inherit"  onClick={()=>manejador()}>
        <CircularProgress />
      </IconButton>
      </Tooltip>
      </Grid>
  }
  </>

);


}
