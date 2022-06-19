import React from "react";
//MUI
import {
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

                      {/* Estado */}
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">Estado:</Typography>
                        <Chip
                          label={cursada.Estado == "A" ? "Activo" : "Baja"}
                          variant="outlined"
                          color={cursada.Estado == "A" ? "success" : "danger"}
                        />
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
                      <Divider />

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
                        <Typography> {ci}</Typography>
                      </ListItem>
                    </List>

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
                      <Typography>{cp}</Typography>
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
                      <Typography>{ce}</Typography>
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
                      <Typography>{cg}</Typography>
                    </ListItem>

                    {/* Cantidad de exámenes: */}
                    <ListItem
                      sx={{
                        pl: 4,
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle2">
                        Parámetros configurados:
                      </Typography>

                      {parseInt(pnt) < 100 ? (
                        <Tooltip
                          title="Debe configurar parámetros"
                          TransitionComponent={Zoom}
                          arrow
                        >
                          <Chip
                            label={pnt + "/100"}
                            variant="outlined"
                            color={"error"}
                            icon={<Cancel />}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Parámetros configurados correctamente"
                          TransitionComponent={Zoom}
                          arrow
                        >
                          <Chip
                            label={pnt + "/100"}
                            variant="outlined"
                            color={"success"}
                            icon={<CheckCircle />}
                          />
                        </Tooltip>
                      )}
                      {/* <Typography>{pnt}/100</Typography> */}
                    </ListItem>
                  </CardContent>
                </CardMain>
              </Grid>
              {/* <Grid container pt={2} rowSpacing={1}>
                <Typography variant="h8">Estado: {estado}</Typography>
              </Grid>

              <Grid rowSpacing={1}>
                <Typography variant="h8">
                  Permite grupos:{" "}
                  {pg === "N" ? (
                    <Tooltip title="No">
                      <IconButton aria-label="Error" size="small" color="error">
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Si">
                      <IconButton aria-label="Ok" size="small" color="success">
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
              </Grid>

              <Grid rowSpacing={1}>
                <Typography variant="h8">
                  Cantidad de inscriptos: {ci}
                </Typography>
              </Grid>

              <Grid rowSpacing={1}>
                <Typography variant="h8">
                  Cantidad de prácticos: {cp}
                </Typography>
              </Grid>

              <Grid rowSpacing={1}>
                <Typography variant="h8">Cantidad de exámenes: {ce}</Typography>
              </Grid>

              <Grid rowSpacing={1}>
                <Typography variant="h8">Cantidad de grupos: {cg}</Typography>
              </Grid>

              <Grid rowSpacing={1}>
                <Typography variant="h8">
                  Parámetros configurados: {pnt}/100
                </Typography>
                {parseInt(pnt) < 100 ? (
                  <Tooltip title="Debe configurar parámetros">
                    <IconButton aria-label="Error" size="small" color="error">
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Parámetros configurados correctamente">
                    <IconButton aria-label="OK" size="small" color="success">
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </CardMainPage>
  );
}
