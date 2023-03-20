import React, { useState } from "react";
//MUI
import { Button, CircularProgress, Tooltip, Zoom } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useNavigate } from "react-router-dom";
import * as Globales from "./Globales";
//
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente ExportarInformacionSituacionFinal ***/
export const ExportarInformacionSituacionFinal = (props) => {
  //Recupero token
  const token = localStorage.getItem("tkn");

  const navegar = useNavigate();
  //
  const [isLoading, setIsLoading] = useState(false);

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

  //Exportacion pdf
  const ExportX = () => {
    var data = {
      pidCu: props.idCursada,
    };

    console.log(data);
    setIsLoading(true);

    consultas(data, endpoints.exportarNotas)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        console.log(Globales.res);
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
          // navegar(routes.error);
        }
      })
      .catch((error) => {
        // navegar(routes.error);
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Tooltip title="Exportar información" TransitionComponent={Zoom} arrow>
        <span>
          <Button
            variant="outlined"
            sx={{ minWidth: "20px", paddingX: "10px" }}
            onClick={() => {
              ExportX();
            }}
            disabled={isLoading}
          >
            {!isLoading && <FileDownloadOutlinedIcon />}
            {isLoading && <CircularProgress size={24} color="inherit" />}
          </Button>
        </span>
      </Tooltip>
    </>
  );
};
