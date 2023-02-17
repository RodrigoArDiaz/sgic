import React, { useEffect, useState } from "react";
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import NotaInput from "./NotaInput";
import {
  TableCell1em,
  TableCellHead,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import {
  Box,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { routes } from "../../../routes";
import { peticionBuscarMisNotasPracticos } from "../../../api/alumnos/notasApi";
import { green, red } from "@mui/material/colors";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import RequisitosDeAprobacion from "../RequisitosDeAprobacion";
import SpinnerMoonLoaderMedium from "../../Spinners/SpinnerMoonLoaderMedium";
import { BotonAccionesPractico } from "./BotonAccionesPractico";
import { ChipCustom } from "../../Material UI - Componentes Modificados/ChipCustom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { formatearFechaDDMMAAAA } from "../../../helpers/formatearFechaDDMMAAAA";

const estilosCell = {
  paddingTop: 0,
  paddingBottom: 0,
};

const NotasPracticosContenedor = () => {
  const { cursada } = useSelector((state) => state.cursada);

  //Variable de estado que indica el estado de la peticion
  const [isLoading, setIsLoading] = useState(false);

  //
  const [practicosNotas, setPracticosNotas] = useState([]);
  const [grupoInfo, setGrupoInfo] = useState({});

  //
  const navegar = useNavigate();

  //Peticion de buscar
  const handleBuscarMisNotasPracticos = async () => {
    setIsLoading(true);
    //Realizo peticon
    try {
      const respuesta = await peticionBuscarMisNotasPracticos(
        cursada.IdCursada,
        null
      );

      let data = respuesta.data;

      if (cursada.TieneGrupos == "S") {
        setGrupoInfo({
          Grupo: data.res[0].Grupo,
          IdGrupo: data.res[0].IdGrupo,
        });
      }

      let aux;
      if (data.res2.length > 0) {
        aux = data.res2.map((row) => ({
          id: "TP" + row.Orden,
          label: "TP" + row.Orden,
          Orden: row.Orden,
          idp: row.IdPractico,
          NotaMinimaAprobacion: row.NotaMinimaAprobacion,
          Nota: data.res[0]["TP" + row.Orden],
          FechaAlta: row.FechaAlta,
          FechaVencimiento: row.FechaVencimiento,
        }));
      }

      setPracticosNotas(aux);
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
    handleBuscarMisNotasPracticos();
  }, []);

  return (
    <>
      {isLoading && <SpinnerMoonLoaderMedium />}

      {!isLoading && (
        <CardMainPage visibleHeader={false} sx={{ marginTop: 2 }}>
          <List sx={{ paddingY: 0 }}>
            <ListItem sx={{ paddingX: 1, flexWrap: "wrap" }}>
              {cursada.TieneGrupos == "S" ? (
                <>
                  {/* <Tooltip
                    title="Listar integrantes"
                    TransitionComponent={Zoom}
                    arrow
                  > */}
                  <IconButton
                    color="secondary"
                    aria-label="expand row"
                    size="small"
                  >
                    <GroupsOutlinedIcon />
                  </IconButton>
                  {/* </Tooltip> */}

                  <ListItemText
                    sx={{ marginLeft: 2 }}
                    primary={grupoInfo.Grupo != undefined && grupoInfo.Grupo}
                  />
                </>
              ) : (
                <ListItemText>
                  <Typography variant="h6" fontSize="1rem">
                    Prácticos
                  </Typography>
                </ListItemText>
              )}

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
                    <TableCellHead align="left">Orden</TableCellHead>
                    <TableCellHead align="center">Práctico</TableCellHead>
                    <TableCellHead align="center">Alta</TableCellHead>
                    <TableCellHead align="center">Vencimiento</TableCellHead>
                    <TableCellHead align="center">
                      Nota minima de aprobación
                    </TableCellHead>
                    <TableCellHead align="center">Nota</TableCellHead>
                    <TableCellHead align="center">Acciones</TableCellHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {practicosNotas.map((practicoNota) => {
                    return (
                      <TableRowElevacion key={practicoNota.IdPractico}>
                        <TableCell1em align="center" sx={estilosCell}>
                          <AvatarCustom
                            outlined={true}
                            sx={{ width: 25, height: 25 }}
                          >
                            {practicoNota.Orden}
                          </AvatarCustom>
                        </TableCell1em>
                        <TableCell1em align="center" sx={estilosCell}>
                          {practicoNota.label}
                        </TableCell1em>
                        <TableCell1em align="center" sx={estilosCell}>
                          {!practicoNota.FechaAlta ||
                          practicoNota.FechaAlta.split("-").length < 3 ? (
                            "-"
                          ) : (
                            <ChipCustom
                              size="large"
                              icon={<CalendarTodayIcon fontSize="small" />}
                              label={formatearFechaDDMMAAAA(
                                practicoNota.FechaAlta
                              )}
                              sx={{
                                "& .MuiChip-label": {
                                  fontSize: "1.17em",
                                },
                              }}
                            />
                          )}
                        </TableCell1em>
                        <TableCell1em align="center" sx={estilosCell}>
                          {!practicoNota.FechaVencimiento ||
                          practicoNota.FechaVencimiento.split("-").length <
                            3 ? (
                            "-"
                          ) : (
                            <ChipCustom
                              size="large"
                              icon={<CalendarTodayIcon fontSize="small" />}
                              label={formatearFechaDDMMAAAA(
                                practicoNota.FechaVencimiento
                              )}
                              sx={{
                                "& .MuiChip-label": {
                                  fontSize: "1.17em",
                                },
                              }}
                            />
                          )}
                        </TableCell1em>
                        <TableCell1em align="center" sx={estilosCell}>
                          {practicoNota.NotaMinimaAprobacion}
                        </TableCell1em>
                        <TableCell1em align="center" sx={estilosCell}>
                          <NotaInput
                            Cond={
                              practicoNota.Nota <
                              practicoNota.NotaMinimaAprobacion
                                ? 1
                                : 0
                            }
                            Nota={practicoNota.Nota}
                          />
                        </TableCell1em>
                        <TableCell1em align="center" sx={estilosCell}>
                          <BotonAccionesPractico
                            IdPractico={practicoNota.idp}
                            label={practicoNota.label}
                          />
                        </TableCell1em>
                      </TableRowElevacion>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CardMainPage>
      )}
    </>
  );
};

export default NotasPracticosContenedor;
