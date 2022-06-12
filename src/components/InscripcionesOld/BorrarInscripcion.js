import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../useModal';


export const BorrarInscripcion = (props) => {
//    const [isOpen, handleOpen, handleClose] = useModal(false);
const [salto,setSalto] = React.useState(props.cambio);

function devolver(){
    
    if (salto==='1'){ setSalto('2');}
    
    
}


if (salto==='1'){return (

<Button   >
            <Tooltip title="Borrar">
                <IconButton 
                    color='primary'
                    onClick={()=>devolver()}
                >
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
            </Button>

);}
    

else {return (

    <Button   variant="outlined" disabled color="primary" >
                <Tooltip title="Borrado">
                    
                        <DeleteIcon/>
                    
                </Tooltip>
                </Button>
    
    );}
}
