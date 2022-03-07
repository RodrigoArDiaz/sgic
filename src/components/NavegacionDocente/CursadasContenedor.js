import React from 'react';
import {Paper, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CursadasLista from './CursadasLista';
//import { CrearCatedra } from './CrearCatedra';
import BuscarCursadas from './BuscarCursadas';
import {GestionarCursadas} from './GestionarCursadas';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
//import SnackMensajes from '../SnackMensajes';
//import BuscarUsuarios from './BuscarUsuarios';

export default function CursadasContenedor(props) {

    const navegar = useNavigate();

    const [datosconsulta, setDC] = React.useState({}); //datos del buscar
    const [filas, setFilas] = React.useState({});       // datos a mostrar
    const [filasxpagina, setFXP] = React.useState(1);   //filas x pagina
    const [pagina, setPagina] = React.useState(1);      //pagina actual
    const [paginacion, setPaginacion] = React.useState();   // cantidad de paginas a mostrar
    const [resultados, setResultado] = React.useState();    //cantidad de resultados devuelto en la consulta
    const [cargando, setCargando] = React.useState(true);   //Espera al consultar
    
//SnackBar
/*
const [mensaje, setMensaje] = React.useState();
const [abrir, setAbrir] = React.useState(false);
const [tipo, setTipo] = React.useState();
*/



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



    function Refrescar(){
      setCargando(true);
      consultas(datosconsulta,'http://127.0.0.1:8000/api/buscarcursadas').then(response=>{
      
      setFilas(response);
      setCargando(false);

      if (response.res.length>0){
        setPaginacion(response.res[0].filas);
      setResultado(response.res[0].resultados);
                  
      }

      })
      .catch(error=>{console.log("Error de conexión"+error);
        navegar("/registrarse");
    });  
      }


    function BuscarCur(parametro){
        parametro.Offset=0;
        parametro.Limite=filasxpagina;
        parametro.pidCa=props.idcatedraprincipal;
        
       setDC(parametro);
      setCargando(true);
      consultas(parametro,'http://127.0.0.1:8000/api/buscarcursadas').then(response=>{
     
      setFilas(response);
             console.log(response); 
      if (response.res.length>0){
        setPaginacion(response.res[0].filas);
      setResultado(response.res[0].resultados);
      
      setPagina(1);

      
      }
      setCargando(false);
    
    })
      .catch(error=>{console.log("Error de conexión"+error);
        navegar("/registrarse");
    });  
      }





function CambioPagina(pag){

    var datos=datosconsulta;
   datos.Offset=((pag*filasxpagina)-filasxpagina);
   datos.Limite=filasxpagina;
   
   setDC(datos);
    setCargando(true);
   consultas(datosconsulta,'http://127.0.0.1:8000/api/buscarcursadas').then(response=>{
  
  setFilas(response); 
  setCargando(false);

})
  .catch(error=>{console.log("Error de conexión"+error);
  navegar("/registrarse");
}); 

setPagina(pag);

}


       
function CambioFPP(pag){

     setFXP(pag);
    var datos=datosconsulta;
    datos.Offset=0;
    datos.Limite=pag;
    
    setDC(datos);
     
setCargando(true);

   consultas(datos,'http://127.0.0.1:8000/api/buscarcursadas').then(response=>{
   
   setFilas(response);
   
   if (response.res.length>0){
    setPaginacion(response.res[0].filas);
    setResultado(response.res[0].resultados);
    setCargando(false);  
}
    })
   .catch(error=>{console.log("Error de conexión"+error);

   navegar("/registrarse");
}); 
 
 }

 


 React.useEffect(() => {

    var data = {

      pAn:'',
      pSem:'',
      piB:'A',
    Offset:0,
    Limite:filasxpagina,
   // pidCat:props.idcatedra,
    pidMat:props.idmateriaprincipal,
      }
      //console.log(props.idmateriaprincipal);
        setDC(data);
    
        consultas(data,'http://127.0.0.1:8000/api/buscarcursadas').then(response=>{
        console.log(response);
        setFilas(response);
       //console.log(response) ;
        
        if(response.res===undefined){
            setCargando(true);
        }
        else{
        if (response.res.length>0){
          setPaginacion(response.res[0].filas);
        setResultado(response.res[0].resultados);
               
        setPagina(1);
        }
        setCargando(false);
        }
    }  )
        .catch(error=>{console.log("Error de conexión"+error);
        navegar("/registrarse");
    }); 

}, []);






//console.log(abrir);
//console.log(mensaje);
//console.log(tipo);
    return (
       
        <Paper
            component="div"
            sx={{ 
                    p: '4px 4px', 
                    // display: 'flex',
                    alignItems: 'center',
                    width:"95%",
                    mt: "10px",
                    px: 2,
                    pb:3,
                    // minHeight: "75vh",
                }}
            elevation={3}
            >


            


            <Grid
              container
              pt={2}
              justifyContent="flex-end" spacing={6}
            >
<Grid item xs={9}  > 
    <BuscarCursadas actualizar={BuscarCur} filasxpagina={filasxpagina} idmateria={props.idmateriaprincipal} />
</Grid>

<Grid sx={{mt:3}} item xs={3} >
                    <GestionarCursadas idmateria={props.idmateriaprincipal} Materia={props.Materia}/>
                </Grid>

            </Grid>

{(cargando===true) &&<Grid
              container
              pt={2}
            >
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
    </Stack></Grid>}
{(cargando===false) &&<Grid
              container
              pt={2}
            >
                <CursadasLista filas={filas} filasxpagina={filasxpagina} pagina={pagina} 
                paginacion={paginacion} resultados={resultados} 
                actualizarpagina={CambioPagina} actualizarfilas={CambioFPP} 
                refrescar={Refrescar}
                Materia={props.Materia}
               // abrir={setAbrir} mensaje={setMensaje} tipo={setTipo}
                idmateria={props.materiaprincipal}
                />
            </Grid>                      }

            <Grid
              container
              pt={2}
            >
               <Button onClick={()=>{props.salto('2'); props.setT('Seleccione la materia');}}>VOLVER</Button>
            </Grid> 
      </Paper>
    )
}
