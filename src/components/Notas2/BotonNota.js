import * as React from 'react';
import {  Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import * as Responses from '../Responses';
import { useNavigate } from "react-router-dom";

const style3 = {
  //verde
    width: {xs: 50},
    
    //color:'red',
    backgroundColor: {xs:"#f5f5f5"},
    //border: "solid black 2px"
  }
  

// equivalente en verde E6FDE9  #e6fde9
const style1 = {
//verde
  width: {xs: 50},
  
  //color:'red',
  backgroundColor: {xs:"#fdeae6"},
  //border: "solid black 2px"
}



const style2 = {
// rojo
  width: {xs: 50},
  
  //color:'red',
  backgroundColor: {xs:"#e6fde9"},
  //border: "solid black 2px"
}

var estilo;

export const BotonNota = (props) => {

  const navegar = useNavigate();

function Transformar(param){
if (param===-5){
return '-';
}
return param;
}



  const [texto, setTexto] = React.useState(''); 
       
  
  const [salto, setSalto] = React.useState('1'); 

  const [nomb, setNombre] = React.useState(Transformar(props.Nota)); 

  
  
  function cambio2(e){
    setTexto(e.target.value);
      }


  function cambio(){
    
    
   
    if (texto!==''&& !isNaN(texto)){
  
      if(parseInt(texto)<0){
        setTexto('');
 props.abrir(true);
 props.mensaje('La nota debe ser mayor que 0');
 props.tipo('error');
      }
      else if(parseInt(texto)>props.cursada.EscalaPracticos){
        setTexto('');
        props.abrir(true);
        props.mensaje('La nota debe ser menor o igual que '+props.cursada.EscalaPracticos);
        props.tipo('error');
      }


      
else{
  var data = {
    pNota:texto,    
    pidAl:props.IdUsuario,
    pidG:'',
     pidDoc:localStorage.getItem('tkn2'), //IdDocente aunque aqui va el token
     pidP:props.IdPractico,
     pidCu:props.cursada.IdCursada,                                        
  }
      setSalto('2');
 Responses.consultas(data,'http://127.0.0.1:8000/api/modificarnotapractico').then(response=>{
 
  if(Responses.status===200){
       
if(parseInt(texto)===0){
  setNombre('-');
  props.mensaje('Nota modificada: '+'-');
}
  else{
  setNombre(texto);
  props.mensaje('Nota modificada: '+texto);
}
  setTexto('');

  
  props.abrir(true);
  
  props.tipo('success');
  setSalto('1');
 
          }
          else if(Responses.status===401){
            navegar("/ingreso");
          }
     else if (Responses.status===460){
      setTexto('');
      setSalto('1');
      if (response.nota1!==undefined){
       props.abrir(true);
       props.mensaje(response.nota1);
       props.tipo('error');
       
          }
         
         
          else if (response.nota2!==undefined){
           props.abrir(true);
           props.mensaje(response.nota2);
           props.tipo('error');
           
             }
     }    
          else {
            navegar("/error");
          }

 })
 .catch(error=>{
   
  navegar("/error");
 });
 

}

  setTexto('');
}

  if (salto==='1'){
  if(nomb==='-'){estilo=style3;

  }  
  else if(parseInt(nomb)<props.NMA){estilo=style1; }
    else{estilo=style2;  }
    return(
  
    <>

     
  <FormControl>
    
    <InputLabel  htmlFor="component-outlined" >{nomb}</InputLabel>
    <OutlinedInput
    sx={{...estilo, width: 50,
      height: 32}}
      id={props.var}
     value={texto}
      onBlur={()=>cambio()}
      onChange={(e)=>cambio2(e)}
      label={nomb}
      
    />

    </FormControl>
    </>
    );
    
    
    
    }
    
if (salto==='2'){
  
  
    return(
<Grid item xs={12} sm="auto">
<Tooltip title="Verificando">
<IconButton aria-label="estado3"  size='small' color="inherit"  >
        <CircularProgress />
      </IconButton>
      </Tooltip>
      </Grid>
        );
    }

}

}

