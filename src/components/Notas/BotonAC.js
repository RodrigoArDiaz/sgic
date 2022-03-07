

import * as React from 'react';
//import Button from '@mui/material/Button';
//import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import * as Globales from './Globales';

export const BotonAC = (props) => {

var idfila=props.id;
//var enunc=props.enunciados; 
//var cor=props.correcciones;
var func=props.cambio;


    const [salto, setSalto] = React.useState(props.param1); 
    const [salto2, setSalto2] = React.useState(props.param2); 

    function manejador(props){
        

if(Globales.enunciados.trim()!==''){

      if (props==='1'){

        
        var filas=Globales.filas.map(function(dato){
        if(dato.id === idfila){
          dato.enunciado = Globales.enunciados;
        //console.log(enunc);
        }
        
        return dato;
      });

      Globales.filas.length=0;

      for (var i = 0; i <filas.length; i++) {
        Globales.filas.push(filas[i]);
      }


        setSalto('1');
      func();
     
      }


}

if (props==='2'){

  
  var filas=Globales.filas.map(function(dato){
    if(dato.id === idfila){
      dato.enunciado = '-';
    //console.log(enunc);
    }
    
    return dato;
  });

  Globales.filas.length=0;

  for (var i = 0; i <filas.length; i++) {
    Globales.filas.push(filas[i]);
  }


    setSalto('2');
  func();
}
}




function manejador2(props){
        

  if(Globales.correcciones.trim()!==''){
  
        if (props==='1'){
  
          
          var filas=Globales.filas.map(function(dato){
          if(dato.id === idfila){
            dato.correcciones = Globales.correcciones;
          //console.log(enunc);
          }
          
          return dato;
        });
  
        Globales.filas.length=0;
  
        for (var i = 0; i <filas.length; i++) {
          Globales.filas.push(filas[i]);
        }
  
  
          setSalto2('1');
        func();
       
        }
  
  
 
  }
 
  
  if (props==='2'){
  
    
    var filas=Globales.filas.map(function(dato){
      if(dato.id === idfila){
        dato.correcciones = '-';
      //console.log(enunc);
      }
      
      return dato;
    });
  
    Globales.filas.length=0;
  
    for (var i = 0; i <filas.length; i++) {
      Globales.filas.push(filas[i]);
    }
  
  
      setSalto2('2');
    func();
  }





  }
  


if (salto==='1' && props.tipo==='enunciadocarga') 
{
    return (
      <div>

<Tooltip title="Recargar enunciado">
<IconButton aria-label="enunciado1" color="success" onClick={()=>manejador('1')}>
        <CheckIcon />
      </IconButton>
      </Tooltip>
      

<Tooltip title="Borrar enunciado">
<IconButton aria-label="enunciado2" onClick={()=>manejador('2')} >
        <CloseIcon />
      </IconButton>
      </Tooltip>
      </div>


  );}




  if (salto==='2' && props.tipo==='enunciadocarga') 
  {
      return (
        <div>
  <Tooltip title="Cargar enunciado">
  <IconButton aria-label="enunciado1"  onClick={()=>manejador('1')}>
          <CheckIcon />
        </IconButton>
        </Tooltip>
        
  
  <Tooltip title="Sin enunciado">
  <IconButton aria-label="enunciado2" color="error"  >
          <CloseIcon />
        </IconButton>
        </Tooltip>
        </div>
  
  
    );} 


 


    if (salto2==='1' && props.tipo==='correccionescarga') 
    {
        return (
          <div>
    <Tooltip title="Recargar correcciones">
    <IconButton aria-label="correcciones1" color="success" onClick={()=>manejador2('1')}>
            <CheckIcon />
          </IconButton>
          </Tooltip>
          
    
    <Tooltip title="Borrar correcciones">
    <IconButton aria-label="correcciones2" onClick={()=>manejador2('2')} >
            <CloseIcon />
          </IconButton>
          </Tooltip>
          </div>
    
    
      );}
    
    
    
    
      if (salto2==='2' && props.tipo==='correccionescarga') 
      {
          return (
            <div>
      <Tooltip title="Cargar correciones">
      <IconButton aria-label="correcciones1"  onClick={()=>manejador2('1')}>
              <CheckIcon />
            </IconButton>
            </Tooltip>
            
      
      <Tooltip title="Sin correcciones">
      <IconButton aria-label="correcciones2" color="error"  >
              <CloseIcon />
            </IconButton>
            </Tooltip>
            </div>
      
      
        );} 
    


}
