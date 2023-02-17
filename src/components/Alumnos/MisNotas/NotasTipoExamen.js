import {
  CardContent,
  Chip,
  Divider,
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
import { peticionBuscarMisNotasExamenes } from "../../../api/alumnos/notasApi";
import { formatearFechaDDMMAAAA } from "../../../helpers/formatearFechaDDMMAAAA";
import { routes } from "../../../routes";
import { BotonAcciones } from "../../Examenes2/BotonAcciones";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom";
import { ChipCustom } from "../../Material UI - Componentes Modificados/ChipCustom";
import {
  TableCell1em,
  TableCellHead,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import RequisitosDeAprobacion from "../RequisitosDeAprobacion";
import { BotonAccionesExamenes } from "./BotonAccionesExamenes";
import NotaInput from "./NotaInput";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const estilosCell = {
  paddingTop: 0,
  paddingBottom: 0,
};

const NotasTipoExamen = ({ parametro }) => {
  console.log(parametro);
  const { cursada } = useSelector((state) => state.cursada);

  //Variable de estado que indica el estado de la peticion
  const [isLoading, setIsLoading] = useState(false);

  //
  const [practicosNotas, setPracticosNotas] = useState([]);
  const [grupoInfo, setGrupoInfo] = useState({});

  //Determina el label segun el tipo de examen
  const TipoExamen = (tipo) => {
    switch (tipo) {
      case "F":
        return "Final";

      case "Q":
        return "Quiz";

      case "P":
        return "Parcial";

      default:
        return "";
    }
  };

  // const TipoChip = (param) => {
  //   if (param === "P") return "info";
  //   if (param === "Q") return "warning";
  //   if (param === "F") return "success";
  // };

  //
  const navegar = useNavigate();

  //Peticion de buscar
  const handleBuscarMisNotasExamenes = async () => {
    setIsLoading(true);
    //Realizo peticon
    try {
      const respuesta = await peticionBuscarMisNotasExamenes(
        cursada.IdCursada,
        parametro.IdParametro,
        null
      );

      let data = respuesta.data;

      let aux;
      if (data.res2.length > 0) {
        aux = data.res2.map((row) => ({
          id: parametro.Tipo + row.Orden,
          label: parametro.Tipo + row.Orden,
          Orden: row.Orden,
          IdExamen: row.IdExamen,
          NotaMinimaAprobacion: row.NotaMinimaAprobacion,
          Nota: data.res[0][parametro.Tipo + row.Orden],
          FechaVencimiento: row.FechaVencimiento,
        }));
      }
      console.log(aux);
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
    handleBuscarMisNotasExamenes();
  }, []);

  return (
    <>
      <ListItem sx={{ paddingX: 2, flexWrap: "wrap" }}>
        <ListItemText>
          <Typography variant="h6" fontSize="1rem">
            {TipoExamen(parametro.Tipo)}
          </Typography>
        </ListItemText>
        <RequisitosDeAprobacion />
      </ListItem>
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
                <TableCellHead align="center">
                  {TipoExamen(parametro.Tipo)}
                </TableCellHead>
                <TableCellHead align="center">Fecha</TableCellHead>
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
                      {!practicoNota.FechaVencimiento ||
                      practicoNota.FechaVencimiento.split("-").length < 3 ? (
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
                          practicoNota.Nota < practicoNota.NotaMinimaAprobacion
                            ? 1
                            : 0
                        }
                        Nota={practicoNota.Nota}
                      />
                    </TableCell1em>
                    <TableCell1em align="center" sx={estilosCell}>
                      <BotonAccionesExamenes
                        IdExamen={practicoNota.IdExamen}
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
    </>
  );
};

export default NotasTipoExamen;
