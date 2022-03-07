import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from '../useModal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import ExamenCEPanel from './ExamenCEPanel'
import BuscarInscripciones from './BuscarInscripciones'
import {ExamenCorEnc} from './ExamenCorEnc'
import Box from '@mui/material/Box';
import * as Globales from './Globales';
//import TextField from '@mui/material/TextField';



import { Tooltip } from '@mui/material';






export const EditarExamenEC = (props) => {
    //Variable de estado y handles de eventos para la ventana modal
    const [isOpen,handleOpen,handleClose] = useModal(false);
   /* const [enunciados, setEnc] = React.useState('');
    const [correcciones, setCor] = React.useState('');
    
    const handleEnc = (event) => {
        setEnc(event.target.value);
      };


      const handleCor = (event) => {
        setCor(event.target.value);
      };

*/
    return (
        /*

        <Button
        variant='contained'
        startIcon={<AddIcon/>}
        fullWidth 
        onClick={handleOpen}  
    >
        agregar inscripcion
    </Button>*/

        <>
           <Tooltip title="Enunciados y correcciones" fullWidth>
                  <Button onClick={handleOpen}>
                  {props.nombre}
                  </Button></Tooltip>
 
            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                fullScreen
            >
                <DialogTitle>{props.nombre}</DialogTitle>
                
                <Grid
              
              >
                  <BuscarInscripciones/>
              </Grid>

  <ExamenCorEnc/>
              <Grid
                container pt={2}
              >
  
                  <ExamenCEPanel />
  
  
                  </Grid>


                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Volver</Button>
                   
                </DialogActions>
            </Dialog>
        </>
    )
}
