import React from "react";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TarjetaPerfilUsuario from "./TarjetaPerfilUsuario";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CerrarSesion from "./CerrarSesion";
import { useSelector } from "react-redux";

function MenuUsuario() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.user);
  // const { Usuario } = user;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        sx={{ display: { xs: "none", sm: "flex" } }}
        variant="outlined"
        color="tertiary"
        startIcon={<AccountCircleIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        aria-describedby={id}
        onClick={handleClick}
      >
        {user.Usuario}
      </Button>

      <CerrarSesion responsive={false} />

      <TarjetaPerfilUsuario
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        responsive={false}
        sx={{ display: { xs: "none", sm: "flex" } }}
      />
    </>
  );
}

export default MenuUsuario;
