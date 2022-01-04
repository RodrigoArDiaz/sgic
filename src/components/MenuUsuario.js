import React from 'react';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TarjetaPerfilUsuario from './TarjetaPerfilUsuario';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CerrarSesion from './CerrarSesion';

function MenuUsuario({informacionUsuario}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return ( 
        <>
            <Button
                sx={{display: {xs: 'none', sm:'flex'}}}
                variant= "outlined"
                color="tertiary"
                disableElevation
                startIcon={<AccountCircleIcon/>}
                endIcon={<KeyboardArrowDownIcon />}
                aria-describedby={id} 
                onClick={handleClick}
            >    
                {informacionUsuario.apellido+" "+informacionUsuario.nombre}
            </Button>
        
            <CerrarSesion responsive={false}/>
        
            <TarjetaPerfilUsuario 
                id={id} 
                open={open}
                anchorEl ={anchorEl}
                handleClose = {handleClose}
                responsive = {false}
                sx={{display:{xs: 'none',sm:'flex'}}}
                informacionUsuario={informacionUsuario}
            />
        </>
     );
}

export default MenuUsuario;