import React from "react";
import { Box, CardContent, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotasContenedorPracticos from "./NotasContenedorPracticos";
import NotasContenedorExamenes from "./NotasExamenes/NotasContenedorExamenes";
import SituacionFinalContenedor from "./SituacionFinal/SituacionFinalContenedor";
import { useSelector } from "react-redux";
import { blue } from "@mui/material/colors";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import TabContext from "@mui/lab/TabContext";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";

export default function NotasContenedor(props) {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  const [titulo, setTitulo] = React.useState("Trabajos Prácticos");
  const [cambiocontexto, setCT] = React.useState("1");

  const handleChange = (event, newValue) => {
    setCT(newValue);
  };

  return (
    <>
      <CardMainPage icon="fact_check" title="Notas" bgColorIcon={blue[500]}>
        <CardContent>
          {/* <Grid container pt={1} justifyContent="flex-end" spacing={8}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={() => {
                  setCT("1");
                  setTitulo("Trabajos Práctricos");
                }}
              >
                Prácticos
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={() => {
                  setCT("2");
                  setTitulo("Exámenes");
                }}
              >
                Exámenes
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={() => {
                  setCT("3");
                  setTitulo("Situación Final");
                }}
              >
                Situación Final
              </Button>
            </Grid>
          </Grid > */}
          <Paper elevation={0}>
            <TabContext value={cambiocontexto}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                paddingX={2}
              >
                <TabList onChange={handleChange} aria-label="notas">
                  <Tab label="Trabajos Prácticos" value="1" />
                  <Tab label="Exámenes" value="2" />
                  <Tab label="Situación Final" value="3" />
                </TabList>
              </Box>

              {cambiocontexto === "1" && (
                <NotasContenedorPracticos
                  cursada={cursada}
                  titulo="Trabajos Prácticos"
                />
              )}
              {cambiocontexto === "2" && (
                <NotasContenedorExamenes cursada={cursada} titulo="Exámenes" />
              )}
              {cambiocontexto === "3" && (
                <SituacionFinalContenedor
                  cursada={cursada}
                  titulo="Situación Final"
                />
              )}
            </TabContext>
          </Paper>
        </CardContent>
      </CardMainPage>
    </>
  );
}
