import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../../useModal';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import * as Responses from '../../Responses';

export const BorrarDeGrupo = (props) => {
    const [isOpen, handleOpen, handleClose] = useModal(false);
    
    const navegar = useNavigate();
    const [est,setE] = React.useState('1');

    
    
    function Inscribir(){
       
        setE('3');
        var data = {
            pidUs:props.alumno.IdUsuario,
            pidCu:props.cursada.IdCursada,
            pidG:props.grupo.IdGrupo
        }
        

        Responses.consultas(data,'http://127.0.0.1:8000/api/borraralumnogrupo').then(response=>{
            
            if(Responses.status===200){
              
                handleClose();
        props.abrir(true);
        props.mensaje(response.Mensaje);
        props.tipo('success');
                setE('2');
                          }
                          else if(Responses.status===401){
                            navegar("/ingreso");
                          }
                     else if (Responses.status===460){
                        handleClose();
                               props.abrir(true);
                        props.mensaje(response.Error);
                        props.tipo('error');
                    
                   setE('1');
                     }    
                          else {
                            navegar("/error");
                          }
        
        
         })
        .catch(error=>{
            navegar("/error");
      });  
        }
  

    return (
        <>
            {    (est==='1') && 

<>
<Tooltip title="Borrar">
<IconButton aria-label="verificado" size='small' color="success" onClick={()=>{handleOpen()}} >
        <DoNotDisturbOnIcon />
      </IconButton>
      </Tooltip>

     
      <Dialog 
          open={isOpen} 
          onClose={handleClose}
          maxWidth="xs"
          fullWidth
      >
          <DialogTitle>Borrar Integrante</DialogTitle>
          <DialogContent>
              <DialogContentText>
              ¿Seguro que desea borrar el alumno del grupo?
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button variant='contained' onClick={()=>{Inscribir()}}>Aceptar</Button>
              <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
          </DialogActions>
      </Dialog>  

      </>

      }
                                
                                
                                {(est==='2') &&  
<Tooltip title="Borrado">
<IconButton aria-label="error"  size='small' >
        <Brightness1Icon />
      </IconButton>
      </Tooltip>
      }

{                                 (est==='3') && 
  <Tooltip title="Cargando">
  <IconButton aria-label="esperando"  size='small' >
  <CircularProgress />
        </IconButton>
        </Tooltip>
           } 
        </>
    )
    


}

