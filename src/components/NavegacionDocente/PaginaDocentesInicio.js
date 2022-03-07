import React from 'react'
import { Grid } from '@mui/material'
import {Paper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import { useNavigate } from "react-router-dom";
import  CatedrasUsuarioLista  from './CatedrasUsuarioLista';
import MateriasContenedor from './MateriasContenedor';
import CursadasContenedor from './CursadasContenedor';

export default function PaginaDocentesInicio(props) {
    
    
    const navegar = useNavigate();

    //const [salto, setS] = React.useState('1');
    //const [idcatedraprincipal, setCat] = React.useState();
    //const [idmateriaprincipal, setMat] = React.useState();
    //const [idcursadaprincipal, setCur] = React.useState();

//    const [titulo, setT] = React.useState('Seleccione la cátedra');
    //const [mat, setM] = React.useState();


    const [datosconsulta, setDC] = React.useState({}); //datos del buscar
    const [filas, setFilas] = React.useState({});       // datos a mostrar
    const [filasxpagina, setFXP] = React.useState(1);   //filas x pagina
    const [pagina, setPagina] = React.useState(1);      //pagina actual
    const [paginacion, setPaginacion] = React.useState();   // cantidad de paginas a mostrar
    const [resultados, setResultado] = React.useState();    //cantidad de resultados devuelto en la consulta
    const [cargando, setCargando] = React.useState(true);   //Espera al consultar
    

    
    async function consultas(data, cadena){

        const response = await fetch(cadena,
        {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer '+localStorage.getItem('tkn')
            }
          }
        );
    
             return response.json();
    }



    function Refrescar(){
      setCargando(true);
      consultas(datosconsulta,'http://127.0.0.1:8000/api/listarcatus').then(response=>{
      
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


    function BuscarCat(parametro){
        parametro.Offset=0;
        parametro.Limite=filasxpagina;
        
       setDC(parametro);
      setCargando(true);
      consultas(parametro,'http://127.0.0.1:8000/api/listarcatus').then(response=>{
     
      setFilas(response);
              
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
   consultas(datosconsulta,'http://127.0.0.1:8000/api/listarcatus').then(response=>{
  
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

   consultas(datos,'http://127.0.0.1:8000/api/listarcatus').then(response=>{
   
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
        Catedra:'',
        Bajas:'B',
        Offset:0,
        Limite:filasxpagina,}

        setDC(data);
      

        consultas(data,'http://127.0.0.1:8000/api/listarcatus').then(response=>{
            

      if(response.message==='Unauthenticated.'){
        //console.log(response.message);
        navegar("/iniciar_sesion_super");}

        setFilas(response);
        
        
        if(response.res===undefined){
            setCargando(true);
        }
        else{
        /*if (response.res.length>0){
         // setPaginacion(response.res[0].filas);
       // setResultado(response.res[0].resultados);
               
       // setPagina(1);
        }*/
        setCargando(false);
        }
    }  )
        .catch(error=>{console.log("Error de conexión en useefect"+error);
        navegar("/registrarse");
    }); 

}, []);



    
    
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


            <Grid container pt={10}>
                
            </Grid>


            <Grid
              container
              pt={1}
              justifyContent="flex-end" spacing={8}
            >


              
            </Grid>

{(cargando===true) &&<Grid 
              container
              pt={10}
            >
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
    </Stack></Grid>}
{(cargando===false && props.salto==='2') &&<Grid
              container
              pt={10}
            >
                <MateriasContenedor idcatedraprincipal={props.idcatedraprincipal}
                salto={props.setS} setT={props.setT} setMat={props.setMat} setM={props.setM}
                //abrir={setAbrir} mensaje={setMensaje} tipo={setTipo}
                />
            </Grid>        
                          }
       

       {(cargando===false && props.salto==='3') &&<Grid
              container
              pt={10}
            >
                <CursadasContenedor idmateriaprincipal={props.idmateriaprincipal}
                salto={props.setS} setT={props.setT} setCat={props.setCat} Materia={props.mat}
                //abrir={setAbrir} mensaje={setMensaje} tipo={setTipo}
                />
            </Grid>        
                          }



       {(cargando===false && props.salto==='1') &&<Grid
              container
              pt={10}
            >
                <CatedrasUsuarioLista filas={filas} filasxpagina={filasxpagina} pagina={pagina} 
                paginacion={paginacion} resultados={resultados} 
                actualizarpagina={CambioPagina} actualizarfilas={CambioFPP} 
                refrescar={Refrescar}
                salto={props.setS} setCat={props.setCat} setT={props.setT}
                //abrir={setAbrir} mensaje={setMensaje} tipo={setTipo}
                />
            </Grid>        
                          }





      </Paper>
    )
}
