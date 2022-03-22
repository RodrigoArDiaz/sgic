import * as React from "react";
//MUI
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
//Componentes modificados
import { CardList } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { useDispatch } from "react-redux";
import {
  actualizarCatedra,
  actualizarIdCatedra,
} from "../../store/slices/catedraSlice";

const estilosCardInscripciones = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

export default function OutlinedCard(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  /**
   * Guarda datos de la catedra seleccionada y
   * cambia vista a la pagina de materias
   */
  const handleIngresarCatedra = () => {
    props.setSalto("2");
    dispatch(actualizarCatedra(props.catedra));
    dispatch(actualizarIdCatedra(props.idcatedra));
  };

  return (
    <CardList sx={estilosCardInscripciones}>
      <CardHeader
        sx={{ marginBottom: "auto", paddingBottom: "0" }}
        title={
          <Typography
            variant="h5"
            textAlign="center"
            //   color="primary"
            sx={{
              fontWeight: "medium",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            {props.catedra}
          </Typography>
        }
      />
      <CardContent sx={{ borderBottom: "1.5px solid rgb(227, 242, 253)" }}>
        <Divider sx={{ mb: "1rem" }}></Divider>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          size="medium"
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={handleIngresarCatedra}
        >
          Ingresar
        </Button>
      </CardActions>
    </CardList>
  );
}
