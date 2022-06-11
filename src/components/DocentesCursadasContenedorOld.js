import React from "react";
//MUI
import {
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
//Componentes
import { ExportarInfoAlumnos } from "./ExportarInfoAlumnos";
import { ClonarCursada } from "./ClonarCursada";
import { GenerarCuadricula } from "./GenerarCuadricula";
import { useDispatch, useSelector } from "react-redux";
import CardMainPage from "./Material UI - Componentes Modificados/CardMainPage";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/material";
import { CardMain } from "./Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { Cancel, Check, CheckCircle } from "@mui/icons-material";

export default function DocentesCursadasContenedor() {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);
  //Recupero informacion de la materia
  const { materia } = useSelector((state) => state.materia);

  return (
    <CardMainPage
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
                    border: "1px solid",
                    borderColor: "secondary.light100",
                    "&:hover": {
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    },
                  }}
                >
                  <CardContent>
                    <List component="div" disablePadding>
                      {/* Cursada */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">Cursada:</Typography>
                        <Typography>
                          {materia} - {cursada.Anio}
                        </Typography>
                      </ListItem>
                      <Divider />

                      {/* Estado */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">Estado:</Typography>
                        {/* <Typography>{cursada.Estado}</Typography> */}
                        <Chip
                          label={cursada.Estado == "A" ? "Activo" : "Baja"}
                          variant="outlined"
                          color={cursada.Estado == "A" ? "success" : "danger"}
                        />
                      </ListItem>
                      <Divider />

                      {/* Fecha Inicio */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">
                          Fecha Inicio:
                        </Typography>
                        <Chip label={cursada.FechaInicio} />
                      </ListItem>

                      {/* Fecha Inicio */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">
                          Fecha Inicio:
                        </Typography>
                        <Chip label={cursada.FechaFin} />
                      </ListItem>
                      <Divider />

                      {/* Permite grupos */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">
                          Permite grupos:
                        </Typography>
                        {/* <Typography>{cursada.TieneGrupos}</Typography> */}
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
                      </ListItem>

                      {/* Cantidad de inscriptos */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">
                          Cantidad de inscriptos:
                        </Typography>
                        <Typography>-</Typography>
                      </ListItem>

                      {/* Cantidad de prácticos */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">
                          Cantidad de prácticos:
                        </Typography>
                        <Typography>-</Typography>
                      </ListItem>

                      {/* Cantidad de exámenes: */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">
                          Cantidad de exámenes:
                        </Typography>
                        <Typography>-</Typography>
                      </ListItem>

                      {/* Cantidad de grupos: */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">
                          Cantidad de grupos:
                        </Typography>
                        <Typography>-</Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </CardMain>
              </Grid>
              <Grid item xs={12} sx={{ overflowX: "auto" }}>
                {/* Acciones */}
                <Grid
                  container
                  padding={2}
                  justifyContent="flex-start"
                  spacing={1}
                >
                  <Grid item xs={4}>
                    <ExportarInfoAlumnos />
                  </Grid>

                  <Grid item xs={4}>
                    <GenerarCuadricula />
                  </Grid>

                  <Grid item xs={4}>
                    <ClonarCursada />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid container pt={2} rowSpacing={1}>
            <Grid item xs={12} display="flex" justifyContents="space-around">
              <Typography variant="h8">Estado:</Typography>
              <Typography variant="h8">{cursada.Estado}</Typography>
            </Grid>
          </Grid>

          <Grid rowSpacing={1}>
            <Typography variant="h8">
              Permite grupos: {cursada.TieneGrupos}
            </Typography>
          </Grid>

          <Grid rowSpacing={1}>
            <Typography variant="h8">Cantidad de inscriptos:</Typography>
          </Grid>

          <Grid rowSpacing={1}>
            <Typography variant="h8">Cantidad de prácticos :</Typography>
          </Grid>

          <Grid rowSpacing={1}>
            <Typography variant="h8">Cantidad de exámenes:</Typography>
          </Grid>

          <Grid rowSpacing={1}>
            <Typography variant="h8">Cantidad de grupos:</Typography>
          </Grid> */}

          {/* Acciones */}
          {/* <Grid container pt={3} justifyContent="flex-start" spacing={1}>
            <Grid item xs={4}>
              <ExportarInfoAlumnos />
            </Grid>

            <Grid item xs={4}>
              <GenerarCuadricula />
            </Grid>

            <Grid item xs={4}>
              <ClonarCursada />
            </Grid>
          </Grid> */}
        </Grid>
      </CardContent>
    </CardMainPage>
  );
}
