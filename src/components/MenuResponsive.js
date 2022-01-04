import * as React from 'react';
import Button from '@mui/material/Button';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import TarjetaPerfilUsuario from './TarjetaPerfilUsuario';
import IconButton from '@mui/material/IconButton';



export default function BasicPopover({informacionUsuario}) {
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
    <Box
        sx={{display:{xs: 'block',sm:'none', md:'none'}}}
    >
      <IconButton 
        aria-describedby={id} 
        aria-label="Menú"
        sx={{color: "#fff"}}
        onClick={handleClick}
        disableElevation
      >
        <MoreIcon/> 
      </IconButton>
 
        <TarjetaPerfilUsuario 
            id={id} 
            open={open}
            anchorEl ={anchorEl}
            handleClose = {handleClose}
            responsive = {true}
            sx={{display:{xs: 'block',sm:'none', md:'none'}}}
            informacionUsuario={informacionUsuario}
        />
    </Box>
  );
}
