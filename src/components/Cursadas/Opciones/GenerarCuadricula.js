import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Globales from "./Globales";
import Add from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";

export const GenerarCuadricula = (props) => {
  const navegar = useNavigate();

  async function consultas(data, cadena) {
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

    consultas(data, "http://127.0.0.1:8000/api/cuadricula")
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
        startIcon={<FontAwesomeIcon icon={faSheetPlastic} />}
        fullWidth
        onClick={() => Cuadricula()}
      >
        Generar Cuadrícula
      </Button>
    </>
  );
};
