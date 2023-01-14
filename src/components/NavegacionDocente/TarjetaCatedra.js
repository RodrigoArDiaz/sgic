import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
//Redux
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../../store/slices/menuSlice";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { CardHeader, Divider } from "@mui/material";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";

export default function TarjetaCatedra(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  return (
    // <Box sx={{ minWidth: 100 }}>
    <CardMainPage
      icon="assured_workload"
      // title={props.catedra}
      bgColorIcon="cyan.main300"
      titleTextAlign="left"
      dividerVisible={false}
      //
      visibleIcon={false}
      visibleHeader={false}
    >
      <CardHeader
        avatar={
          <AssuredWorkloadOutlinedIcon
            sx={{ color: "rgb(255,255,255)" }}
            fontSize="medium"
          />
        }
        sx={{
          bgcolor: "rgb(24, 144, 255)",
          borderRadius: "4px 4px 0 0",
          "&:hover": {
            bgcolor: "#f3f3f3",
          },
        }}
      >
        {" "}
      </CardHeader>
      <Divider></Divider>
      <CardContent sx={{ paddingY: "3rem" }}>
        <Typography variant="h5" align="center">
          {props.catedra}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          align: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="large"
          variant="outlined"
          onClick={() => {
            props.salto("2");
            props.setCat(props.idcatedra);
            // props.setT("Seleccione la materia");
            //Actualiza el titulo al montar la pagina
            dispatch(actualizarTitulo("Seleccione la materia"));
          }}
          endIcon={
            <ArrowForwardIcon />
            //<FontAwesomeIcon icon={faArrowAltCircleRight} />
          }
        >
          Ingresar
        </Button>
      </CardActions>
    </CardMainPage>
    // </Box>
  );
}
