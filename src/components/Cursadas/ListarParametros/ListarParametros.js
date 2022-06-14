import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  {useModal}  from '../../useModal';
import  ParametrosContenedorLista  from './ParametrosContenedorLista';


export const ListarParametros = (props) => {

    const [isOpen, handleOpen, handleClose] = useModal(false);

    return (
        <>
        <Tooltip title="Listar parámetros">
           
        <IconButton 
                    color='secondary'
                    size='small'
                    onClick={handleOpen}
                >
                    <ViewListIcon/>
                </IconButton>
            </Tooltip>
            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                
               
                <DialogTitle>Parametros de {props.Materia} - {props.anio} 
                - {props.semestre}</DialogTitle>
                <DialogContent>
                    <ParametrosContenedorLista idcursada={props.idcursada} 
                    semestre={props.semestre} Materia={props.Materia} anio={props.anio}/>
                </DialogContent>
                <DialogActions>
                   
                   <Button variant='outlined'  color="secondary" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
         
              
            </Dialog>  
        </>
    )
}
