import React from "react";
import {
  Alert,
  AlertTitle,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import MateriasLista from "./MateriasLista";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import * as Responses from "../Responses";

export default function MateriasContenedor(props) {
  const navegar = useNavigate();

  const [filas, setFilas] = React.useState({}); // datos a mostrar

  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  React.useEffect(() => {
    var data = {
      pMat: "",
      piB: "A",
      Offset: 0,
      Limite: 30,

      pidCa: props.idcatedraprincipal,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/buscarmateriascat")
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }, []);

  return (
    <>
      {cargando === "3" && (
        <ListItem key="0" disablePadding>
          <ListItemText>
            <Alert severity="info" variant="outlined">
              <AlertTitle>La catedra no tiene materias asociadas.</AlertTitle>
              Si es administrador de la catedra, comuníquese con el
              superadministrador para añadir materias.
            </Alert>
          </ListItemText>
        </ListItem>
      )}

      {cargando === "2" && (
        <MateriasLista
          filas={filas}
          salto={props.salto}
          setMat={props.setMat}
          setM={props.setM}
          setT={props.setT}
          idcatedra={props.idcatedra}
        />
      )}

      <Grid container pt={2}>
        <Button
          onClick={() => {
            props.salto("1");
            props.setT("Seleccione la cátedra");
          }}
          startIcon={<ArrowBackIcon />}
        >
          VOLVER
        </Button>
      </Grid>
    </>
  );
}
