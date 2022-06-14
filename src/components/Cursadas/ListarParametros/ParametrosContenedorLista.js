import React from 'react';
import {Paper, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from "react-router-dom";
import SnackMensajes from '../SnackMensajes';
import ParametrosListaListar from './ParametrosListaListar';

import * as Responses from '../../Responses';


export default function ParametrosContenedorLista(props) {

    const navegar = useNavigate();

    const [datosconsulta, setDC] = React.useState({}); //datos del buscar
    const [filas, setFilas] = React.useState({});       // datos a mostrar
            const [cargando, setCargando] = React.useState('1');   //Espera al consultar
    
//SnackBar

const [mensaje, setMensaje] = React.useState();
const [abrir, setAbrir] = React.useState(false);
const [tipo, setTipo] = React.useState();






    function Refrescar(){
      setCargando('1');
      Responses.consultas(datosconsulta,'http://127.0.0.1:8000/api/listarparametros').then(response=>{
      
        if(Responses.status===200){
          setFilas(response);
          setCargando('2');       

        }
        else if(Responses.status===401){
          navegar("/ingreso");
        }

        else if(Responses.status===460){
          setCargando('3'); 
        }
        else {
          navegar("/error");
        }




      })
      .catch(error=>{
        navegar("/error");
        
    });  
      }

 


 React.useEffect(() => {

    var data = {
    IdCursada:props.idcursada,
    pidCu:props.idcursada,
      }
      
        setDC(data);
    
        Responses.consultas(data,'http://127.0.0.1:8000/api/listarparametros').then(response=>{
        
        if(Responses.status===200){
          setFilas(response);
          setCargando('2');       

        }
        else if(Responses.status===401){
          navegar("/ingreso");
        }

        else if(Responses.status===460){
          setCargando('3'); 
        }
        else {
          navegar("/error");
        }

  
    }  )
        .catch(error=>{
          navegar("/error");
        
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


            


            <Grid
              container
              pt={2}
              justifyContent="flex-end" spacing={8}
            >

            </Grid>

            {cargando==='3' && <h4 >No se encontraron resultados</h4>}
{(cargando==='1') &&<Grid
              container
              pt={8}
            >
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
    </Stack></Grid>}
{(cargando==='2') &&<Grid
              container
              pt={8}
            >
                <ParametrosListaListar filas={filas} 

                refrescar={Refrescar}
                
                semestre={props.semestre} Materia={props.Materia} anio={props.anio}

                abrir={setAbrir} mensaje={setMensaje} tipo={setTipo}
                idcursada={props.idcursada}
                />
            </Grid>                      }

<div><SnackMensajes abrir={abrir} mensaje={mensaje} tipo={tipo} cerrar={setAbrir}/>    </div>       
      </Paper>
    )
}
