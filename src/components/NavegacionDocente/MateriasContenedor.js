import React from "react";
//MUI
import { AlertTitle, ListItem, ListItemText } from "@mui/material";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
//
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import MensajeFeedback from "../MensajeFeedback";
import MateriasLista from "./MateriasLista";

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
            <MensajeFeedback>
              <AlertTitle>La catedra no tiene materias asociadas.</AlertTitle>
              Si es administrador de la catedra, comuníquese con el
              superadministrador para añadir materias.
            </MensajeFeedback>
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
          variant="outlined"
          onClick={() => {
            props.salto("1");
            props.setT("Seleccione la cátedra");
          }}
          startIcon={<ArrowBackIcon />}
        >
          Volver
        </Button>
      </Grid>
    </>
  );
}
