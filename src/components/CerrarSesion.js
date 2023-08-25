import React from "react";
//MUI
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//
import { useModal } from "../hooks/useModal";
import { useDispatch } from "react-redux";
import { userReset } from "../store/slices/userSlice";
import { loginReset } from "../store/slices/loginSlice";
import { logoutUsuario } from "../api/sgicApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

/*********************************************************
 * Componente
 */
export default function CerrarSesion({ handleCloseMenu }) {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.login);

  const handleLogout = async (e) => {
    handleClose();
    try {
      const res = await logoutUsuario(token);
      dispatch(userReset());
      navigate(routes.iniciarSesion);
    } catch (error) {
      console.log(error);
    }
    //Resetea los datos de login(authenticacion) y de usuario
    dispatch(loginReset());
    dispatch(userReset());
  };

  return (
    <>
      <ListItemButton
        onClick={() => {
          handleCloseMenu();
          handleOpen();
        }}
      >
        <ListItemIcon>
          <LogoutIcon sx={{ color: "icons.main" }} />
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant="p">Cerrar sesión</Typography>}
        />
      </ListItemButton>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle display="flex" flexDirection="row">
          <LogoutIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Cerrar sesión
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea cerrar sesión?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleLogout}>
            Aceptar
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
