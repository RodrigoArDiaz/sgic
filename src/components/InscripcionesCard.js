import React from "react";
// material-ui
import { CardHeader, Divider } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
//Componentes propios
import {
  CardList,
  DivInfo,
} from "./Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones.js";
import InscribirseEnCursada from "./InscribirseEnCursada";

const estilosCardInscripciones = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

const InscripcionesCard = ({ cursada }) => {
  const { catedra, materia, anio, fechaInicio, idCursada } = cursada;

  return (
    <CardList sx={estilosCardInscripciones}>
      <CardHeader
        sx={{ marginBottom: "auto", paddingBottom: "0" }}
        title={
          <Typography
            variant="h5"
            textAlign="center"
            //   color="primary"
          >
            {materia + " " + anio}
          </Typography>
        }
      />
      <CardContent sx={{ borderBottom: "1.5px solid rgb(227, 242, 253)" }}>
        <Divider sx={{ mb: "1rem" }}></Divider>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign="center">
          Materia <br /> {materia}
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          sx={{ mb: 1.5 }}
          variant="body2"
          textAlign="center"
        >
          Catedra
          <br />
          {catedra}
        </Typography>
      </CardContent>
      <CardActions
        //Alinear con flexbox
        sx={{
          //alignSelf: "center",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <DivInfo>
          {" "}
          <Typography color="text.secondary" textAlign="center">
            Fecha de Inicio <br />
          </Typography>
          <Typography textAlign="center">{fechaInicio}</Typography>
        </DivInfo>
        <Divider orientation="vertical" />
        <InscribirseEnCursada cursada={cursada} />
      </CardActions>
    </CardList>
  );
};

export default InscripcionesCard;
