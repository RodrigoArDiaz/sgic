import React from "react";
import { Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import * as Responses from "../../Responses";

//Redux
import { useSelector } from "react-redux";

export default function DocentesCursadasContenedor(props) {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

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
    <Paper
      component="div"
      sx={{
        p: "4px 4px",
        // display: 'flex',
        alignItems: "center",
        width: "95%",
        mt: "10px",
        px: 2,
        pb: 3,
        // minHeight: "75vh",
      }}
      elevation={3}
    >
      <Grid container pt={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Información de la cursada</Typography>
        </Grid>
      </Grid>

      <Grid container pt={2} rowSpacing={1}>
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
        <Typography variant="h8">Cantidad de inscriptos: {ci}</Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">Cantidad de prácticos: {cp}</Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">Cantidad de exámenes: {ce}</Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">Cantidad de grupos: {cg}</Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">Parámetros configurados: {pnt}/100</Typography>
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
      </Grid>
    </Paper>
  );
}
