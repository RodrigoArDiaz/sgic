import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Grid, IconButton } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
//Redux
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../../store/slices/menuSlice";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";

/*** Componente TarjetaCatedra ***/
export default function TarjetaCatedra(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        props.salto("2");
        props.setCat(props.idcatedra);
        dispatch(actualizarTitulo("Seleccione la materia"));
      }}
      sx={{
        borderRadius: "4px",
        height: "100%",

        "&:hover": {
          cursor: "pointer",
          "&  svg": {
            transform: "scale(1.2)",
            transition: "transform 0.7s ease",
          },
        },
      }}
    >
      <CardMainPage
        dividerVisible={false}
        visibleIcon={false}
        visibleHeader={false}
        sx={{
          height: "100%",
          borderRightWidth: "3px",
          borderRightColor: "rgb(24, 144, 255)",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={3}>
            <Box
              sx={{
                bgcolor: "rgb(24, 144, 255)",
                borderRadius: "4px 0 0 4px",

                height: "100%",
                width: "100%",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box alignSelf="center">
                <IconButton disableRipple>
                  <AccountBalanceOutlinedIcon
                    sx={{ color: "rgb(255,255,255)" }}
                    fontSize="large"
                  />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center!important",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ paddingY: 3.5, height: "60%" }}>
                <Typography variant="h5" align="center">
                  {props.catedra}
                </Typography>{" "}
                <Divider />
              </CardContent>

              <Box textAlign="center" sx={{ mt: "0.5rem" }}>
                <Typography
                  variant="text"
                  sx={{ color: "text.subtitle1secondary" }}
                >
                  Ingresar &rarr;
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardMainPage>
    </Box>
  );
}
