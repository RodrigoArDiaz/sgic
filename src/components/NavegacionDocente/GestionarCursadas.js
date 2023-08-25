import React from "react";
//MUI
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
//Hooks modal
import { useModal } from "../useModal";
//Componentes propios
import CursadasContenedor from "../Cursadas/CursadasContenedor";

//Redux
import { useSelector } from "react-redux";

/*** Comoponente GestionarCursadas ***/
export const GestionarCursadas = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Manejo del titulo e items del menu
  const { jsonMateria } = useSelector((state) => state.materia);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<SettingsOutlinedIcon />}
        fullWidth
        color="primary"
        onClick={handleOpen}
      >
        Gestionar cursadas
      </Button>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullScreen>
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "#fff",
            boxShadow: "none",
            backdropFilter: "blur(6px)",
            borderBottom: "1px solid",
            borderColor: "borders.main",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <IconButton
              size="medium"
              color="tertiary"
              aria-label="open drawer"
              edge="center"
              sx={{
                // marginRight: "36px",
                color: "text.bodysecondary",
                borderRadius: "4px",
                backgroundColor: "icons.bg",
              }}
              disableRipple
            >
              <SettingsOutlinedIcon
                sx={{ fontSize: 24, color: "icons.main" }}
              />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Gestión de cursadas
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              startIcon={<CloseOutlinedIcon />}
            >
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ bgcolor: "background.default" }}>
          <Box paddingBottom={2}>
            <Typography variant="h5">{props.Materia}</Typography>
          </Box>

          <CursadasContenedor
            Materia={props.Materia}
            idmateria={jsonMateria.IdMateria}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
