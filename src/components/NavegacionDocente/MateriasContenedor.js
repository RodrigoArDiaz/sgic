import React from "react";
import { Paper, Typography } from "@mui/material";
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
      {cargando === "3" && <h4>No se encontraron resultados</h4>}

      {/* {cargando === "1" && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
        </Stack>
      )} */}

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
