import React from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useModal } from "../useModal";

import CursadasContenedor from "../Cursadas/CursadasContenedor";
import BuildIcon from "@mui/icons-material/Build";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

//Redux
import { useSelector } from "react-redux";

export const GestionarCursadas = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Manejo del titulo e items del menu
  const { jsonMateria } = useSelector((state) => state.materia);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<SettingsOutlinedIcon />}
        //size='small'
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
            // paddingLeft: "5.5px",
            // backgroundColor: "transparent",
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
              // color="inherit"
              color="tertiary"
              aria-label="open drawer"
              // onClick={handleDrawerToggle}
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
        {/* <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Volver
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};
