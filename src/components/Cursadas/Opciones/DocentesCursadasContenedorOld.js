import React from "react";
//MUI
import {
  Box,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  Typography,
  Zoom,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { blue } from "@mui/material/colors";
//React router
import { useNavigate } from "react-router-dom";
//Responses
import * as Responses from "../../Responses";
//Redux
import { useSelector } from "react-redux";
//MUI - personalizados
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import { CardMain } from "../../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import CardMainPageHeaderTransparent from "../../Material UI - Componentes Modificados/CardMainPageHeaderTransparent";

const ChipCustom = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <Chip {...props} ref={ref}>
      {props.children}
    </Chip>
  );
});

export default function DocentesCursadasContenedor(props) {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);
  //Recupero informacion de la materia
  const { materia } = useSelector((state) => state.materia);
  //
  const navegar = useNavigate();

  const [estado, setE] = React.useState(); //pagina actual
  const [pg, setPG] = React.useState(); // cantidad de paginas a mostrar
  const [ci, setCI] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cp, setCP] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [ce, setCE] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cg, setCG] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [pnt, setP] = React.useState(); //cantidad de resultados devuelto en la consulta

  React.useEffect(() => {
    var data = {
      pidCu: cursada.IdCursada,
      // pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/infocursada")
      .then((response) => {
        if (Responses.status === 200) {
          setE(response.res[0].Estado);
          setPG(response.res[0].PermiteGrupos);
          setCI(response.res[0].CantidadIns);
          setCP(response.res[0].CantidadP);
          setCE(response.res[0].CantidadE);
          setCG(response.res[0].CantidadG);
          setP(response.res[0].SumaPrm);
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }, []);

  return (
    <CardMainPageHeaderTransparent
      icon="info"
      title="Información de la cursada"
      bgColorIcon={blue[500]}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={12} paddingX={2} sx={{ overflowX: "auto" }}>
            <Grid container justifyContent="end" sx={{ overflowX: "auto" }}>
              <Grid item xs={12} sx={{ overflowX: "auto" }}>
                <CardMain
                  sx={{
                    border: "none",
                  }}
                >
                  <CardContent>
                    <Grid container justifyContent="space-between" rowGap={2}>
                      {/* Cursada */}
                      {/* <Box textAlign="center" sx={{ width: "100%" }}>
                        <Typography variant="h6">
                          {materia} - {cursada.Anio}
                        </Typography>
                      </Box> */}

                      {/* Fecha Inicio */}
                      <Grid
                        item
                        xs={5.5}
                        textAlign="center"
                        paddingTop={2}
                        paddingBottom={2}
                        sx={{
                          borderRadius: "10px",
                          border: "1px solid",
                          borderColor: "secondary.light100",
                        }}
                      >
                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <CalendarTodayIcon
                            fontSize="4"
                            sx={{ marginRight: "0.5rem" }}
                          />
                          {cursada.FechaInicio}
                        </Typography>
                        {/* <Chip label={cursada.FechaInicio} /> */}
                        <Typography
                          variant="subtitle2"
                          sx={{ opacity: "0.75" }}
                        >
                          Fecha Inicio
                        </Typography>
                      </Grid>

                      {/* Fecha Inicio */}
                      <Grid
                        item
                        xs={5.5}
                        textAlign="center"
                        paddingTop={2}
                        paddingBottom={2}
                        sx={{
                          borderRadius: "10px",
                          border: "1px solid",
                          borderColor: "secondary.light100",
                        }}
                      >
                        {/* <Chip label={cursada.FechaFin} /> */}

                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <CalendarTodayIcon
                            fontSize="4"
                            sx={{ marginRight: "0.5rem" }}
                          />
                          {cursada.FechaFin}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ opacity: "0.75" }}
                        >
                          Fecha Fin
                        </Typography>
                      </Grid>

                      {/* Estado */}
                      <Grid
                        item
                        xs={5.5}
                        textAlign="center"
                        paddingTop={2}
                        paddingBottom={2}
                        sx={{
                          borderRadius: "10px",
                          border: "1px solid",
                          borderColor: "secondary.light100",
                        }}
                      >
                        <Chip
                          label={cursada.Estado == "A" ? "Activo" : "Baja"}
                          variant="outlined"
                          color={cursada.Estado == "A" ? "success" : "danger"}
                        />
                        <Typography
                          marginTop={1}
                          variant="subtitle2"
                          sx={{ opacity: "0.75" }}
                        >
                          Estado
                        </Typography>
                      </Grid>

                      {/* Permite grupos */}
                      <Grid
                        item
                        xs={5.5}
                        textAlign="center"
                        paddingTop={2}
                        paddingBottom={2}
                        sx={{
                          borderRadius: "10px",
                          border: "1px solid",
                          borderColor: "secondary.light100",
                        }}
                      >
                        <Chip
                          label={cursada.TieneGrupos == "S" ? "SI" : "NO"}
                          variant="outlined"
                          color={
                            cursada.TieneGrupos == "S" ? "success" : "error"
                          }
                          icon={
                            cursada.TieneGrupos == "S" ? (
                              <CheckCircle />
                            ) : (
                              <Cancel />
                            )
                          }
                        />
                        <Typography
                          marginTop={1}
                          variant="subtitle2"
                          sx={{ opacity: "0.75" }}
                        >
                          Permite grupos
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardMain>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </CardMainPageHeaderTransparent>
  );
}
