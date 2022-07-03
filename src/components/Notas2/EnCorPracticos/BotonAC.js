import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import BotonAceptar from './BotonAceptar';
import ECVisual from './ECVisual';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import * as Responses from '../../Responses';

export const BotonAC = (props) => {

  const navegar = useNavigate();

function Transformar(param){
  if (param==='-') return '';
  else return param;
}
    const [salto, setSalto] = React.useState(props.enunciado); 
    const [salto2, setSalto2] = React.useState(props.correcciones); 
    

// Manejador

    function manejador(variable){
  
if (props.param1!==undefined){
if(props.param1.trim()!==''){

      if (variable==='1'){
        var data = {
          pEnc:props.param1,
          pCor:Transformar(props.correcciones),
          pidCP:props.IdCursadaPractico ,
          
        }
setSalto(false);
        Responses.consultas(data,'http://127.0.0.1:8000/api/modificarecpra').then(response=>{

          if(Responses.status===200){
            props.mensaje('Enunciado modificado');
            props.abrir(true);
            
            props.tipo2('success');
            
            setSalto(props.param1);
                        
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


if (variable==='2'){

  
  var data = {
    pEnc:'',
    pCor:Transformar(props.correcciones),
    pidCP:props.IdCursadaPractico ,
    
  }

setSalto(false);
  Responses.consultas(data,'http://127.0.0.1:8000/api/modificarecpra').then(response=>{

  
    if(Responses.status===200){
    
      setSalto('-');
      
      props.mensaje('Enunciado borrado');
      props.abrir(true);
      
      props.tipo2('warning');
          
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
    

// Manejador



function manejador2(variable){

if (props.param2!==undefined){
if(props.param2.trim()!==''){

      if (variable==='1'){
        var data = {
          pEnc:Transformar(props.enunciado),
          pCor:props.param2,
          pidCP:props.IdCursadaPractico ,
          
        }
setSalto2(false);
        Responses.consultas(data,'http://127.0.0.1:8000/api/modificarecpra').then(response=>{


          if(Responses.status===200){
            props.mensaje('Enunciado modificado');
            props.abrir(true);
            
            props.tipo2('success');
            
            setSalto2(props.param2);
                
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


if (variable==='2'){

  
  var data = {
    pEnc:Transformar(props.enunciado),
    pCor:'',
    pidCP:props.IdCursadaPractico ,
    
  }

setSalto2(false);
  Responses.consultas(data,'http://127.0.0.1:8000/api/modificarecpra').then(response=>{

  

    if(Responses.status===200){
   
      setSalto2('-');
      
      props.mensaje('Enunciado borrado');
      props.abrir(true);
      
      props.tipo2('warning');
              
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
    

// Manejador



if (salto===false && props.tipo==='Enunciado'){
  return(
<Tooltip title="Verificando">
<IconButton aria-label="estado3"  size='small' color="inherit"  >
        <CircularProgress />
      </IconButton>
      </Tooltip>


  );
}


if (salto2===false && props.tipo==='Correcciones'){
  return(
<Tooltip title="Verificando">
<IconButton aria-label="estado3"  size='small' color="inherit"  >
        <CircularProgress />
      </IconButton>
      </Tooltip>


  );
}



if (salto!=='-' && props.tipo==='Enunciado') 
{
    return (
      <div>
 <ECVisual valor={salto}/>
<BotonAceptar Operacion={manejador}/>
      

<Tooltip title="Borrar enunciado">
<IconButton aria-label="enunciado2" size='small' onClick={()=>manejador('2')} >
        <CloseIcon />
      </IconButton>
      </Tooltip>
      </div>


  );}




  if (salto==='-' && props.tipo==='Enunciado') 
  {
      return (
        <div>

<ECVisual valor={salto}/>

  <Tooltip title="Cargar enunciado">
  <IconButton aria-label="enunciado1" size='small' onClick={()=>manejador('1')}>
          <CheckIcon />
        </IconButton>
        </Tooltip>
        
  
  <Tooltip title="Sin enunciado">
  <IconButton aria-label="enunciado2" size='small' color="error"  >
          <CloseIcon />
        </IconButton>
        </Tooltip>
        </div>
  
  
    );} 


 


    if (salto2!=='-' && props.tipo==='Correcciones') 
    {
        return (
          <div>
            <ECVisual valor={salto2}/>
    <Tooltip title="Recargar correcciones">
    <IconButton aria-label="correcciones1" size='small' color="success" onClick={()=>manejador2('1')}>
            <CheckIcon />
          </IconButton>
          </Tooltip>
          
    
    <Tooltip title="Borrar correcciones">
    <IconButton aria-label="correcciones2" size='small' onClick={()=>manejador2('2')} >
            <CloseIcon />
          </IconButton>
          </Tooltip>
          </div>
    
    
      );}
    
    
    
    
      if (salto2==='-' && props.tipo==='Correcciones') 
      {
          return (
            <div>
              <ECVisual valor={salto2}/>
      <Tooltip title="Cargar correciones">
      <IconButton aria-label="correcciones1" size='small' onClick={()=>manejador2('1')}>
              <CheckIcon />
            </IconButton>
            </Tooltip>
            
      
      <Tooltip title="Sin correcciones">
      <IconButton aria-label="correcciones2" size='small' color="error"  >
              <CloseIcon />
            </IconButton>
            </Tooltip>
            </div>
      
      
        );} 
    


}
