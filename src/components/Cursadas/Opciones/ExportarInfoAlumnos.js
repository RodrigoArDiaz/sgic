import React from "react";
//MUI
import { Button, Tooltip, Zoom } from "@mui/material";
import { useModal } from "../../../hooks/useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Globales from "./Globales";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente ExportarInfoAlumnos ***/
export const ExportarInfoAlumnos = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Recupero token
  const token = localStorage.getItem("tkn");

  const navegar = useNavigate();

  async function consultas(data, cadena) {
    //Adjunto token
    data = { ...data, ...{ token: token } };

    //Peticion
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("tkn"),
      },
    });
    Globales.setRes(response.status);
    return response.blob();
  }

  //Exportacion PDF
  function ExportP() {
    var data = {
      pidCu: props.idcursada,
    };

    consultas(data, endpoints.exportarPdf)
      .then((response) => {
        if (Globales.res === 200) {
          // const url = window.URL.createObjectURL(new Blob([response]));
          // window.open(url, "_blank");

          // Convierto a Blob
          var blob = new Blob([response], { type: "application/pdf" });
          // Creo un objeto URL desde el blob
          var url = window.URL || window.webkitURL;
          var downloadUrl = url.createObjectURL(blob);
          //Abro url en otra ventana
          window.open(downloadUrl, "_blank");
        } else if (Globales.res === 401) {
          navegar(routes.iniciarSesion);
        } else if (Globales.res === 460) {
          props.abrir(true);
          props.mensaje("No hay alumnos inscriptos");
          props.tipo("error");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  //Exportacion pdf
  function ExportX() {
    var data = {
      pidCu: props.idcursada,
    };

    consultas(data, endpoints.exportarExcel)
      .then((response) => {
        if (Globales.res === 200) {
          // const url = window.URL.createObjectURL(new Blob([response]));
          // window.open(url, "_blank");
          // Convierto a Blob
          var blob = new Blob([response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          // Creo un objeto URL desde el blob
          var url = window.URL || window.webkitURL;
          var downloadUrl = url.createObjectURL(blob);
          //Abro url en otra ventana
          window.open(downloadUrl, "_blank");
        } else if (Globales.res === 401) {
          navegar(routes.iniciarSesion);
        } else if (Globales.res === 460) {
          props.abrir(true);
          props.mensaje("No hay alumnos inscriptos");
          props.tipo("error");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  return (
    <>
      <Tooltip title="Exportar información" TransitionComponent={Zoom} arrow>
        <span>
          <Button
            variant="outlined"
            // startIcon={<FontAwesomeIcon icon={faFileExport} />}
            sx={{ minWidth: "20px", paddingX: "10px" }}
            onClick={handleOpen}
          >
            <FileDownloadOutlinedIcon />
          </Button>
        </span>
      </Tooltip>

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
        <DialogTitle display="flex" flexDirection="row">
          <FileDownloadOutlinedIcon
            sx={{ alignSelf: "center", marginRight: 1 }}
          />
          Exportar Información
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Seleccione el formato:</DialogContentText>

          <Grid container justifyContent="space-evenly" spacing={2} pt={2}>
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
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
