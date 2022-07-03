import React from "react";
import { Button } from "@mui/material";
import { useModal } from "../../../hooks/useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Globales from "./Globales";
import Add from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFileExport,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

export const ExportarInfoAlumnos = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        //'Accept': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("tkn"),
      },
    });
    Globales.setRes(response.status);
    return response.blob();
  }

  function ExportP() {
    var data = {
      pidCu: props.idcursada,
    };

    consultas(data, "http://127.0.0.1:8000/api/exportarpdf")
      .then((response) => {
        if (Globales.res === 200) {
          const url = window.URL.createObjectURL(new Blob([response]));
          window.open(url, "_blank");
        } else if (Globales.res === 401) {
          navegar("/ingreso");
        } else if (Globales.res === 460) {
          props.abrir(true);
          props.mensaje("No hay alumnos inscriptos");
          props.tipo("error");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }

  function ExportX() {
    var data = {
      pidCu: props.idcursada,
    };

    consultas(data, "http://127.0.0.1:8000/api/exportarexcel")
      .then((response) => {
        if (Globales.res === 200) {
          const url = window.URL.createObjectURL(new Blob([response]));
          window.open(url, "_blank");
        } else if (Globales.res === 401) {
          navegar("/ingreso");
        } else if (Globales.res === 460) {
          props.abrir(true);
          props.mensaje("No hay alumnos inscriptos");
          props.tipo("error");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FontAwesomeIcon icon={faFileExport} />}
        fullWidth
        onClick={handleOpen}
      >
        Exportar Información
      </Button>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle>Exportar Información</DialogTitle>
        <DialogContent>
          <DialogContentText>Seleccione el formato:</DialogContentText>

          <Grid container justifyContent="space-evenly" spacing={2} pt={1}>
            <Grid item xs={6} textAlign="center">
              <Button
                variant="outlined"
                size="medium"
                startIcon={<FontAwesomeIcon icon={faFilePdf} />}
                onClick={() => ExportP()}
              >
                PDF
              </Button>
            </Grid>

            <Grid item xs={6} textAlign="center">
              <Button
                variant="outlined"
                size="medium"
                startIcon={<FontAwesomeIcon icon={faFileExcel} />}
                onClick={() => ExportX()}
              >
                XLSX
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
