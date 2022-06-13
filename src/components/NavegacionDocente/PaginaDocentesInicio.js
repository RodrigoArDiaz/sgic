import React from "react";
import { CardContent, Divider, Grid } from "@mui/material";
import { Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import { useNavigate } from "react-router-dom";
import CatedrasUsuarioLista from "./CatedrasUsuarioLista";
import MateriasContenedor from "./MateriasContenedor";
import CursadasContenedor from "./CursadasContenedor";
import * as Responses from "../Responses";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { GridBreadCrumbs } from "../Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
import BreadCrumbs from "../BreadCrumbs";

/****************************************************/
export default function PaginaDocentesInicio(props) {
  const navegar = useNavigate();

  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  React.useEffect(() => {
    var data = {
      Catedra: "",
      Bajas: "B",
      Offset: 0,
    };

    // Petición a API
    Responses.consultas(data, "http://127.0.0.1:8000/api/listarcatus")
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

  //
  return (
    <Grid container>
      {cargando === "3" && <h4>No se encontraron resultados</h4>}

      {cargando === "1" && (
        <Grid container pt={10}>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
          </Stack>
        </Grid>
      )}
      {cargando === "2" && props.salto === "2" && (
        <Grid container>
          <MateriasContenedor
            idcatedraprincipal={props.idcatedraprincipal}
            salto={props.setS}
            setT={props.setT}
            setMat={props.setMat}
            setM={props.setM}
          />
        </Grid>
      )}

      {cargando === "2" && props.salto === "3" && (
        <Grid container>
          <CursadasContenedor
            idmateriaprincipal={props.idmateriaprincipal}
            salto={props.setS}
            setT={props.setT}
            setCat={props.setCat}
            Materia={props.mat}
          />
        </Grid>
      )}

      {cargando === "2" && props.salto === "1" && (
        <Grid container>
          <CatedrasUsuarioLista
            filas={filas}
            salto={props.setS}
            setCat={props.setCat}
            setT={props.setT}
          />
        </Grid>
      )}
    </Grid>
  );
}
