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

const estilosCardInscripciones = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

const CardList = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  //   color: theme.palette.primary.main,
  border: "1.5px solid rgb(227, 242, 253)",
  //   border: `1.5px solid ${theme.palette.secondary.light}`,
  //   border: "1px solid rgb(33, 1'50, 243)",
  border: `1px solid ${blue["100"]}`,
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",

  "&:hover": {
    // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    // boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    // boxShadow:
    //   "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
}));

const DivInfo = styled("div")(({ theme }) => ({
  background: orange["50"],
  borderRadius: "10px",
  padding: "0.3rem 1rem",
}));

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
