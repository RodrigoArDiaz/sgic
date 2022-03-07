

import * as React from 'react';
//import Button from '@mui/material/Button';
/*import Stack from '@mui/material/Stack';
import {ModificarGrupo} from './ModificarGrupo';
import {ListarIntegrantes} from './ListarIntegrantes';
import {InscribirEnGrupo} from './InscribirEnGrupo';
import {BorrarGrupo} from './BorrarGrupo';
import { Button } from '@mui/material';*/
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import SnackBar from './SnackBar'
//import Stack from '@mui/material/Stack';
//import { Tooltip } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { Tooltip } from '@mui/material';

//import Box from '@mui/material/Box';


// equivalente en verde E6FDE9  #e6fde9
const style1 = {

  width: {xs: 50},
  
  //color:'red',
  backgroundColor: {xs:"#fdeae6"},
  //border: "solid black 2px"
}



const style2 = {

  width: {xs: 50},
  
  //color:'red',
  backgroundColor: {xs:"#e6fde9"},
  //border: "solid black 2px"
}

var estilo;
var color;
var title;
export const BotonAcciones = (props) => {
  
  const [texto, setTexto] = React.useState(''); 
       
  
  const [salto, setSalto] = React.useState('1'); 

  const [nomb, setNombre] = React.useState(props.var2); 

  //const [abrir, setAbrir] = React.useState(false); 

  const [tipo, setTipo] = React.useState('1'); 

  //const [id, setId] = React.useState(props.var); 


function cambio3(){setSalto('1');}
function cambio4(){setTipo('1');}
  
  function cambio2(e){
    //setNombre('Cambio');
    //setSalto('1') ;
setTexto(e.target.value);
    
  //if (salto ==='1'){setSalto('2'); }
  //if (salto ==='2'){setSalto('1');}
  }


  function cambio(){
    
    
   
    if (texto!==''&& !isNaN(texto)){
    if(parseInt(texto)<1 || parseInt(texto)>10   ){
  
      setTexto('');
      
      if (salto==='1')
      {setSalto('2');}
      //else {setSalto('3');}

    }
    else{
    setNombre(texto);
    setTexto('');
    

    setTipo('2');
      
    setSalto('1');
  }
  //if (salto ==='1'){setSalto('2'); }
  //if (salto ==='2'){setSalto('1');}
  }
  setTexto('');
}




function msjok(){

  if(tipo==='2') 
  
  return(

    <div>
    <SnackBar  cambiar2={()=>cambio4()} abrir={true} tipo={tipo}/>  

   
  </div>
  );
}



  if (salto==='1'){
  
    if(parseInt(nomb)<4){estilo=style1; color='error'; title='No cumple con la nota mínima';}
    else{estilo=style2; color='success'; title='Cumple con la nota mínima';}
    return(
  
    <div>

     
  <FormControl>
    
    <InputLabel  htmlFor="component-outlined" >{nomb}</InputLabel>
    <OutlinedInput
    sx={{...estilo}}
      id={props.var}
     value={texto}
      onBlur={()=>cambio()}
      onChange={(e)=>cambio2(e)}
      label={nomb}
      
    />

    </FormControl>

    <Tooltip title={title}>
<IconButton aria-label="informacion" color={color}>
        <ErrorOutlineIcon />
      </IconButton>
      </Tooltip>

      
    <div>{msjok()}</div>
    
      
    </div>
    );
    
    
    
    }
    
if (salto==='2'){
  
  //console.log("Paso por aqui 2");
    return(
      <div>
         
      
        <SnackBar cambiar={()=>cambio3()} abrir={true} tipo={'1'}/>
        </div>
        );
    }

/*

    if (salto==='3'){
      console.log("Paso por aqui 3");
      return(
        <div>
           
        <FormControl>
          <InputLabel htmlFor="component-outlined" >{nomb}</InputLabel>
          <OutlinedInput
            id={props.var}
           value={texto}
            onBlur={()=>cambio()}
            onChange={(e)=>cambio2(e)}
            label={nomb}
          />
       
          </FormControl>
          
          
          </div>
          );
      }
  
*/

  /*if(salto==='1'){return(<FormControl>
    <InputLabel htmlFor="component-outlined" >{props.var2}</InputLabel>
    <OutlinedInput
      id={props.var}
     //value="Txt"
      onBlur={()=>cambio()}
      label={props.var2}
    />
    </FormControl>);}
  else {//console.log(texto);
    //setTexto('tex');
    return(<FormControl>
      <InputLabel htmlFor="component-outlined">Cambio</InputLabel>
      <OutlinedInput
        id={props.var}
        label={props.var2}
        value={props.var2}
        //onBlur={()=>cambio()}
        
      />
      </FormControl>);}



*/
}



/*
<FormControl>
<InputLabel htmlFor="component-outlined">{props.var2}}</InputLabel>
<OutlinedInput
  id={props.var}
  //value={name}
  onBlur={()=>cambio()}
  label="Name"
/>
</FormControl>
*/
