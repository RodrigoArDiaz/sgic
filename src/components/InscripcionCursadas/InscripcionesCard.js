import React from "react";
// material-ui
import { CardHeader, Divider } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
//Componentes propios
import { DivInfo } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina.js";
import InscribirseEnCursada from "./InscribirseEnCursada";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage.js";

const estilosCardInscripciones = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  "&:hover": {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important",
  },
};
/*** Componente  InscripcionesCard ***/
const InscripcionesCard = ({ cursada, handleListarCursadasEnInscripcion }) => {
  const { Catedra, Materia, Anio, FechaInicio, IdCursada } = cursada;

  return (
    <CardMainPage sx={estilosCardInscripciones} visibleHeader={false}>
      <CardHeader
        sx={{ marginBottom: "auto", paddingBottom: "0" }}
        title={
          <Typography variant="h5" textAlign="center">
            {Materia + " " + Anio}
          </Typography>
        }
      />
      <CardContent>
        <Divider sx={{ mb: "1rem" }}></Divider>

        <Typography sx={{ mb: 1.5 }} variant="body2" textAlign="center">
          Catedra
          <br />
          {Catedra}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <DivInfo>
          <Typography color="text.secondary" textAlign="center">
            Fecha de Inicio <br />
          </Typography>
          <Typography textAlign="center">{FechaInicio}</Typography>
        </DivInfo>
        <Divider orientation="vertical" />
        <InscribirseEnCursada
          cursada={cursada}
          handleListarCursadasEnInscripcion={handleListarCursadasEnInscripcion}
        />
      </CardActions>
    </CardMainPage>
  );
};

export default InscripcionesCard;
