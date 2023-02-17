import {
  Box,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  peticionBuscarMiSituacionFinal,
  peticionBuscarMisNotasPracticos,
} from "../../../api/alumnos/notasApi";
import { routes } from "../../../routes";
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import { CardMain } from "../../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import {
  TableCell1em,
  TableCellHead,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import SpinnerMoonLoaderMedium from "../../Spinners/SpinnerMoonLoaderMedium";
import RequisitosDeAprobacion from "../RequisitosDeAprobacion";
import BotonNC from "./BotonNC";

const estilosCell = {
  paddingTop: 0,
  paddingBottom: 0,
};

const SituacionFinalContenedor = () => {
  const [isLoading, setIsLoading] = useState(false);
  //
  const [celdasHead, setCeldasHead] = useState([]);
  const [datosSituacionFinal, setDatosSituacionFinal] = useState([]);

  //Informacion de cursada
  const { cursada } = useSelector((state) => state.cursada);

  //
  const navegar = useNavigate();
  //Peticion de buscar
  const handleBuscarMiSituacionFinal = async () => {
    setIsLoading(true);
    //Realizo peticon
    try {
      const respuesta = await peticionBuscarMiSituacionFinal(
        cursada.IdCursada,
        null
      );

      let data = respuesta.data;

      let nuevo;
      if (data.res2.length > 0) {
        nuevo = data.res2.map((row) => {
          let requisito;
          if (row.Tipo == "NCEQ") {
            requisito = data.res[0].CumpleReqExQ;
          }

          if (row.Tipo == "NCEP") {
            requisito = data.res[0].CumpleReqExP;
          }

          if (row.Tipo == "NCEF") {
            requisito = data.res[0].CumpleReqExF;
          }

          if (row.Tipo == "NCPRA") {
            requisito = data.res[0].CumpleReqPra;
          }

          const aux = {
            id: row.Tipo,
            label: row.Mensaje,
            minWidth: 20,
            align: "center",
            nota: data.res[0][row.Tipo],
            requisito: requisito,
          };

          return aux;
        });
      }
      setCeldasHead(nuevo);
      setDatosSituacionFinal(data.res[0]);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        //Sesion caducada (sin autorización)
        navegar(routes.iniciarSesion);
      }
    }
    setIsLoading(false);
  };

  //Carga de las cursadas del alumno
  useEffect(() => {
    handleBuscarMiSituacionFinal();
  }, []);

  //Determina label segun el estado
  const determinarEstado = (estado) => {
    switch (estado) {
      case "C":
        return "Cursando";

      case "R":
        return "Regular";

      case "A":
        return "Aprobado";

      case "P":
        return "Promocionado";

      case "L":
        return "Libre";
    }
  };

  return (
    <>
      {isLoading && <SpinnerMoonLoaderMedium />}

      {!isLoading && (
        <>
          <Grid container spacing={2} marginTop={0.5}>
            <Grid item>
              <CardMainPage visibleHeader={false} sx={{ paddingX: 2 }}>
                <Grid container justifyContent="space-between">
                  {/* Cantidad de inscriptos */}
                  <Grid
                    item
                    xs={12}
                    textAlign="center"
                    paddingTop={1}
                    paddingBottom={1}
                  >
                    <Box>
                      <Chip
                        label={determinarEstado(datosSituacionFinal.Estado)}
                        variant="outlined"
                        color="success"
                      />
                    </Box>

                    <Typography variant="subtitle2" sx={{ opacity: "0.75" }}>
                      Estado
                    </Typography>
                  </Grid>
                </Grid>
              </CardMainPage>
            </Grid>

            <Grid item>
              <CardMainPage visibleHeader={false} sx={{ paddingX: 2 }}>
                <Grid container justifyContent="space-between">
                  {/* Cantidad de inscriptos */}
                  <Grid
                    item
                    xs={12}
                    textAlign="center"
                    paddingTop={1}
                    paddingBottom={1}
                  >
                    <Typography variant="h5">
                      {datosSituacionFinal.NotaFinalLibreta}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ opacity: "0.75" }}>
                      Nota libreta
                    </Typography>
                  </Grid>
                </Grid>
              </CardMainPage>
            </Grid>
          </Grid>

          <CardMainPage visibleHeader={false} sx={{ marginTop: 2 }}>
            <List sx={{ paddingY: 0 }}>
              <ListItem sx={{ paddingX: 1, flexWrap: "wrap" }}>
                <ListItemText>
                  <Typography variant="h6" fontSize="1rem">
                    Promedios
                  </Typography>
                </ListItemText>
                <RequisitosDeAprobacion />
              </ListItem>
            </List>
            <CardContent
              sx={{
                padding: 0,
                "&.MuiCardContent-root:last-child": { paddingBottom: 0 },
              }}
            >
              <TableContainer sx={{ maxHeight: "none" }}>
                <Table aria-label="Lista de examenes" size="small">
                  <TableHead>
                    <TableRow>
                      {celdasHead.map((celda) => {
                        return (
                          <TableCellHead align="center">
                            {celda.label}
                          </TableCellHead>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRowElevacion>
                      {celdasHead.map((celda) => {
                        return (
                          <TableCell1em align="center" sx={estilosCell}>
                            <BotonNC
                              Nota={celda.nota}
                              Cond={celda.requisito}
                            ></BotonNC>
                          </TableCell1em>
                        );
                      })}
                    </TableRowElevacion>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </CardMainPage>
        </>
      )}
    </>
  );
};

export default SituacionFinalContenedor;
