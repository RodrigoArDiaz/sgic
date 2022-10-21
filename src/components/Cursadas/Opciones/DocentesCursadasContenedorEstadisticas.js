import React from "react";
//MUI
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
  Zoom,
} from "@mui/material";
import { Grid, Box } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { blue } from "@mui/material/colors";
import LinearProgress from "@mui/material/LinearProgress";
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

/******************************
 * Linear progress custom error
 * */
const BorderLinearProgressError = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.error.lightLow,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    // backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    backgroundColor: theme.palette.error.main,
  },
}));

/********************************
 * Linear progress custom success
 * */
const BorderLinearProgressSuccess = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.success.light,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.success.main,
  },
}));

/******************************
 * Linear progress custom error
 * */
const CircularProgressSuccessError = styled(CircularProgress)(({ theme }) => ({
  //Estilos aplicados si color = 'primary'
  [`&.${circularProgressClasses.colorPrimary}`]: {
    color: theme.palette.success.main,
  },

  //Estilos aplicados si color = 'secondary'
  [`&.${circularProgressClasses.colorSecondary}`]: {
    color: theme.palette.error.main,
  },
}));

// function LinearProgressWithLabel(props) {
//   return (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Box sx={{ width: "100%", mr: 1 }}>
//         {/* <LinearProgress variant="determinate" {...props} /> */}
//         {props.value < 100 ? (
//           <BorderLinearProgressError variant="determinate" {...props} />
//         ) : (
//           <BorderLinearProgressSuccess variant="determinate" {...props} />
//         )}
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" color="text.secondary">{`${Math.round(
//           props.value
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <CircularProgressSuccessError
        variant="determinate"
        {...props}
        size={70}
        value={props.value}
        color={props.value < 100 ? "secondary" : "primary"}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {props.value}%
        </Typography>
      </Box>
    </Box>
  );
}

export default function DocentesCursadasContenedorEstadisticas(props) {
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
    <CardMainPage visibleHeader={false}>
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
                    {/* Cantidad de inscriptos */}
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
                      <Typography variant="h5"> {ci}</Typography>
                      <Typography variant="subtitle2" sx={{ opacity: "0.75" }}>
                        Inscriptos
                      </Typography>
                    </Grid>

                    {/* Cantidad de prácticos */}
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
                      <Typography variant="h5"> {cp}</Typography>
                      <Typography variant="subtitle2" sx={{ opacity: "0.75" }}>
                        Prácticos
                      </Typography>
                    </Grid>

                    {/* Cantidad de exámenes: */}
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
                      <Typography variant="h5">{ce}</Typography>
                      <Typography variant="subtitle2" sx={{ opacity: "0.75" }}>
                        Exámenes
                      </Typography>
                    </Grid>

                    {/* Cantidad de grupos: */}
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
                      <Typography variant="h5">{cg}</Typography>
                      <Typography variant="subtitle2" sx={{ opacity: "0.75" }}>
                        Grupos
                      </Typography>
                    </Grid>

                    {/* Cantidad de parametros: */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" textAlign="center">
                        Parámetros configurados
                      </Typography>
                      <Box sx={{ width: "100%" }} textAlign="center" pt={1}>
                        <CircularProgressWithLabel value={pnt} />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardMain>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardMainPage>
  );
}
