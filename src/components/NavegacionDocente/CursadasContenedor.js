import React from "react";
//MUI
import { AlertTitle, ListItem, ListItemText } from "@mui/material";
import { Grid } from "@mui/material";
import CursadasLista from "./CursadasLista";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
//
import { useNavigate } from "react-router-dom";
//Componentes propios
import { GestionarCursadas } from "./GestionarCursadas";
import * as Responses from "../Responses";
import MensajeFeedback from "../MensajeFeedback";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Comoponente CursadasContenedor ***/
export default function CursadasContenedor(props) {
  const navegar = useNavigate();

  const [filas, setFilas] = React.useState({}); // datos a mostrar

  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  const [EAC, setEAC] = React.useState("");

  React.useEffect(() => {
    var data = {
      pAn: "",
      pSem: "",
      piB: "A",
      Offset: 0,
      Limite: 30,
      pidMat: props.idmateriaprincipal,
    };

    Responses.consultas(data, endpoints.buscarCursadas)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setEAC(response.AdminCat);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }, []);

  return (
    <>
      {EAC === "S" && cargando === "2" && (
        <Grid container justifyContent="flex-end" marginBottom={2}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <GestionarCursadas
              idmateria={props.idmateriaprincipal}
              Materia={props.Materia}
            />
          </Grid>
        </Grid>
      )}

      {cargando === "3" && (
        <ListItem key="0" disablePadding>
          <ListItemText>
            <MensajeFeedback>
              <AlertTitle>La materia aún no tiene cursadas.</AlertTitle>
              {EAC === "S"
                ? `Puede crear cursadas con el boton 'Gestionar cursadas'.`
                : "Comuníquese con el administrador de la cátedra si necesita crear una cursada."}
            </MensajeFeedback>
          </ListItemText>
        </ListItem>
      )}

      {cargando === "2" && (
        <CursadasLista
          filas={filas}
          Materia={props.Materia}
          idmateria={props.materiaprincipal}
        />
      )}

      <Grid container pt={2}>
        <Button
          variant="outlined"
          onClick={() => {
            props.salto("2");
            props.setT("Seleccione la materia");
          }}
          startIcon={<ArrowBackIcon />}
        >
          Volver
        </Button>
      </Grid>
    </>
  );
}
