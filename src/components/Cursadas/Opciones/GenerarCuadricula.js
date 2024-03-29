import React from "react";
//MUI
import { Button, Tooltip, Zoom } from "@mui/material";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
//
import { useNavigate } from "react-router-dom";
import * as Globales from "./Globales";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente GenerarCuadricula ***/
export const GenerarCuadricula = (props) => {
  const navegar = useNavigate();
  //Recupero token
  const token = localStorage.getItem("tkn");

  async function consultas(data, cadena) {
    //Adjunto token
    data = { ...data, ...{ token: token } };
    //
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

  function Cuadricula() {
    var data = {
      pidCu: props.idcursada,
    };

    consultas(data, endpoints.cuadricula)
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

  return (
    <>
      <Tooltip title="Generar cuadrícula" TransitionComponent={Zoom} arrow>
        <span>
          <Button
            variant="outlined"
            // startIcon={<FontAwesomeIcon icon={faSheetPlastic} />}
            sx={{ minWidth: "20px", paddingX: "10px" }}
            fullWidth
            onClick={() => Cuadricula()}
          >
            <TextSnippetOutlinedIcon />
          </Button>
        </span>
      </Tooltip>
    </>
  );
};
