/*

import * as React from 'react';
//import Button from '@mui/material/Button';
/*import Stack from '@mui/material/Stack';
import {ModificarGrupo} from './ModificarGrupo';
import {ListarIntegrantes} from './ListarIntegrantes';
import {InscribirEnGrupo} from './InscribirEnGrupo';
import {BorrarGrupo} from './BorrarGrupo';
import { Button } from '@mui/material';*/
/*
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
//import SnackBar from './SnackBar'
//import Stack from '@mui/material/Stack';
//import { Tooltip } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { Tooltip } from '@mui/material';

// equivalente en verde E6FDE9  #e6fde9
const style1 = {

  width: {xs: 300},
  '& .MuiInputLabel-outlined': {

           width: "100%",
          textAlign: "center",
          transformOrigin: "center",
           
         
  },
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
export const Borrar = () => {
  
  const [texto, setTexto] = React.useState(''); 
       
  
  const [salto, setSalto] = React.useState('1'); 

  const [nomb, setNombre] = React.useState(''); 

  //const [abrir, setAbrir] = React.useState(false); 

  const [tipo, setTipo] = React.useState('1'); 

  //const [id, setId] = React.useState(props.var); 


    return(
  
    
  <FormControl>
    
    <InputLabel  htmlFor="component-outlined" >Hola</InputLabel>
    <OutlinedInput
    sx={{...style1}}
      id={44}
     
      label={'Check'}
      
    />

    </FormControl>

    

  
    );
    
        
    }
    */


    import React from "react";


    import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
//import { withStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';       


        
        export const Borrar = () =>  {
          return (

            <FormControl  sx={{"& .MuiInputBase-formControl":
            {textAlign: "center",
          
            "&. label":{width:"100%",textAlign: "center"}
          }

            
            
  
            
            //"& .MuiInputLabel-outlined":{textAlign:'center'}
            
            }}>
    
            <InputLabel  >Hola</InputLabel>
            <OutlinedInput sx={{
              
            //  "& .MuiOutlinedInput-notchedOutline":{textAlign:'center'},
             //"& .MuiOutlinedInput-input":{textAlign:'center'}
             
             "& .MuiInputLabel-root":{textAlign:'center' }
          
             
          }}
            //sx={{...style1}}
              id={44}
             
              label={'Check'}
              
            />
        
            </FormControl>
/*
              <TextField sx={{"& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "green"
                },
                width:'100%',textAlign:'center'
              },
            
              "& .MuiInputLabel-root": {width:'100%',textAlign:'center'},
              "& .MuiOutlinedInput-notchedOutline": {width:'100%',textAlign:'center'}
             // "& .MuiFormControl-root": {width:'100%',textAlign:'center'}
            
            
            }}
                id="standard-basic"
                label="Standard"/>*/
          );
        }