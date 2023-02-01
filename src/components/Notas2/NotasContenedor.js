import React from "react";
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  Paper,
  Typography,
} from "@mui/material";
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
import {
  Article,
  ArticleOutlined,
  Assignment,
  AssignmentOutlined,
  FactCheck,
  GradingOutlined,
} from "@mui/icons-material";
import CardMainPageHeader from "../Material UI - Componentes Modificados/CardMainPageHeader";
import { TabCustom } from "../Material UI - Componentes Modificados/TabCustom";

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
      <Box paddingBottom={2}>
        <Typography
          variant="h2"
          sx={{
            margin: "0px",
            fontWeight: "500",
            fontSize: "1.775rem",
            lineHeight: "1.27",
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          Notas
        </Typography>
      </Box>

      <CardMainPage visibleHeader={false}>
        <CardContent sx={{ padding: 0 }}>
          <Grid container paddingY={0}>
            {/* Cuerpo pagina */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "transparent",
                }}
              >
                <TabContext value={cambiocontexto}>
                  <Box
                    sx={{
                      padding: 0,
                    }}
                    paddingX={2}
                  >
                    <TabList
                      onChange={handleChange}
                      aria-label="notas"
                      // indicatorColor="secondary"
                      // centered
                      // orientation="vertical"
                    >
                      <TabCustom
                        label="Trabajos Prácticos"
                        value="1"
                        icon={<ArticleOutlined fontSize="small" />}
                        iconPosition="start"
                      />
                      <TabCustom
                        label="Exámenes"
                        value="2"
                        icon={<AssignmentOutlined fontSize="small" />}
                        iconPosition="start"
                      />
                      <TabCustom
                        label="Situación Final"
                        value="3"
                        icon={<GradingOutlined fontSize="small" />}
                        iconPosition="start"
                      />
                    </TabList>
                  </Box>
                  <Divider />

                  <Box>
                    <TabPanel value="1" sx={{ paddingX: 0, paddingY: 0 }}>
                      <NotasContenedorPracticos
                        cursada={cursada}
                        titulo="Trabajos Prácticos"
                      />
                    </TabPanel>

                    <TabPanel
                      value="2"
                      sx={{ paddingX: "0", paddingTop: 0, paddingBottom: 0 }}
                    >
                      <NotasContenedorExamenes
                        cursada={cursada}
                        titulo="Exámenes"
                      />
                    </TabPanel>

                    <TabPanel value="3" sx={{ paddingX: "0", paddingTop: 1 }}>
                      <SituacionFinalContenedor
                        cursada={cursada}
                        titulo="Situación Final"
                      />
                    </TabPanel>
                  </Box>
                </TabContext>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </CardMainPage>
    </>
  );
}
