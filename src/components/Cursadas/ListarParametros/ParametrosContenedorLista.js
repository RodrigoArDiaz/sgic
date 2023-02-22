import React from "react";
//MUI
import { Alert, AlertTitle, Box, ListItem, ListItemText } from "@mui/material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../SnackMensajes";
import ParametrosListaListar from "./ParametrosListaListar";
import * as Responses from "../../Responses";
import { MoonLoader } from "react-spinners";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners";

/*** Componente ParametrosContenedorLista ***/
export default function ParametrosContenedorLista(props) {
  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  //SnackBar

  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  function Refrescar() {
    setCargando("1");
    Responses.consultas(datosconsulta, endpoints.listarParametros)
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
        navegar(routes.error);
      });
  }

  React.useEffect(() => {
    var data = {
      IdCursada: props.idcursada,
      pidCu: props.idcursada,
    };

    setDC(data);

    Responses.consultas(data, endpoints.listarParametros)
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
        navegar(routes.error);
      });
  }, []);

  return (
    <>
      {cargando === "3" && (
        <ListItem key="0" paddingTop={0}>
          <ListItemText>
            <Alert severity="info" variant="outlined">
              <AlertTitle>
                La cursada aún no tiene configurado parametros.
              </AlertTitle>
            </Alert>
          </ListItemText>
        </ListItem>
      )}

      {cargando === "1" && (
        <Grid container paddingTop={0}>
          <Grid item xs={12}>
            <Box component="div" display="flex" justifyContent="center">
              <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
            </Box>
          </Grid>
        </Grid>
      )}
      {cargando === "2" && (
        <Grid container pt={0}>
          <ParametrosListaListar
            filas={filas}
            refrescar={Refrescar}
            semestre={props.semestre}
            Materia={props.Materia}
            anio={props.anio}
            abrir={setAbrir}
            mensaje={setMensaje}
            tipo={setTipo}
            idcursada={props.idcursada}
          />
        </Grid>
      )}

      <div>
        <SnackMensajes
          abrir={abrir}
          mensaje={mensaje}
          tipo={tipo}
          cerrar={setAbrir}
        />{" "}
      </div>
    </>
  );
}
