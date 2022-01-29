import React from "react";

// material-ui
import { CardHeader, Divider, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { styled } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import { CardList, DivInfo } from "./Material UI - Componentes Modificados";

const estilosCardInscripciones = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

const InscripcionesCard = ({ cursada }) => {
  const { catedra, materia, anio, fechaInicio } = cursada;
  return (
    <CardList sx={estilosCardInscripciones}>
      <CardHeader
        sx={{ marginBottom: "auto", paddingBottom: "0" }}
        textAlign="center"
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
        <Button
          size="medium"
          variant="contained"
          color="primary"
          textAlign="center"
          endIcon={<ArrowUpwardIcon />}
          ////Alinear con css
          //   sx={{
          //     display: "block",
          //     margin: "0 auto",
          //   }}
        >
          Inscribirme
        </Button>
      </CardActions>
    </CardList>
  );
};

export default InscripcionesCard;
