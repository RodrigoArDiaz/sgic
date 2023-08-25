import React from "react";
//MUI
import { Alert, AlertTitle, Grid, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CatedrasUsuarioLista from "./CatedrasUsuarioLista";
import MateriasContenedor from "./MateriasContenedor";
import CursadasContenedor from "./CursadasContenedor";
import * as Responses from "../Responses";
import { Box } from "@mui/material";
//React spinner
import { MoonLoader } from "react-spinners";
//Theme provider
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";

/*** Comoponente PaginaDocentesInicio ***/
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
    Responses.consultas(data, endpoints.listarCatUs)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
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
        navegar(routes.iniciarSesion);
      });
  }, []);

  //
  return (
    <Grid container>
      {cargando === "3" && (
        <ListItem key="0" disablePadding>
          <ListItemText>
            <Alert severity="info" variant="outlined">
              <AlertTitle>Aún no tiene catedras asociadas</AlertTitle>
              {/* Comuníquese con el administrador. */}
            </Alert>
          </ListItemText>
        </ListItem>
      )}

      {cargando === "1" && (
        <Grid container paddingTop={4}>
          <Grid item xs={12}>
            <Box component="div" display="flex" justifyContent="center">
              {/* <PropagateLoader color={color} size={15} /> */}
              <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
            </Box>
          </Grid>
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
