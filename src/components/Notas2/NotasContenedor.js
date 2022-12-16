import React from "react";
import {
  Box,
  CardContent,
  CardHeader,
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
      <Grid container>
        {/* Titulo pagina */}
        <Grid item xs={12}>
          <CardMainPageHeader icon={"fact_check"} title="Notas" />
        </Grid>
        {/* Cuerpo pagina */}
        <Grid item xs={12}>
          {/* <CardMainPage visibleHeader={false} bgColorIcon={blue[500]}>
            <CardContent sx={{ paddingX: "0", paddingTop: "0" }}> */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "transparent",
            }}
          >
            <TabContext value={cambiocontexto}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  bgcolor: "transparent",
                }}
                paddingX={0}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="notas"
                  // indicatorColor="secondary"
                >
                  <Tab
                    label="Trabajos Prácticos"
                    value="1"
                    icon={<ArticleOutlined fontSize="small" />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Exámenes"
                    value="2"
                    icon={<AssignmentOutlined fontSize="small" />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Situación Final"
                    value="3"
                    icon={<GradingOutlined fontSize="small" />}
                    iconPosition="start"
                  />
                </TabList>
              </Box>

              <Paper elevation={0} sx={{ marginTop: 2 }}>
                <CardMainPage
                  visibleHeader={false}
                  bgColorIcon={blue[500]}
                  sx={{
                    marginTop: "10px",
                    paddingBottom: "0",
                    "& .MuiCardContent-root:last-child": {
                      paddingBottom: "0",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      paddingX: "0",
                      paddingY: "0",
                      "&:last-child": {
                        paddingBottom: "0",
                      },
                    }}
                  >
                    <TabPanel value="1" sx={{ paddingX: "0", paddingTop: 1 }}>
                      <NotasContenedorPracticos
                        cursada={cursada}
                        titulo="Trabajos Prácticos"
                      />
                    </TabPanel>

                    <TabPanel value="2" sx={{ paddingX: "0", paddingTop: 1 }}>
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
                  </CardContent>
                </CardMainPage>

                {/* {cambiocontexto === "1" && (
                    <NotasContenedorPracticos
                      cursada={cursada}
                      titulo="Trabajos Prácticos"
                    />
                  )}

                  {cambiocontexto === "2" && (
                    <NotasContenedorExamenes
                      cursada={cursada}
                      titulo="Exámenes"
                    />
                  )}
                  {cambiocontexto === "3" && (
                    <SituacionFinalContenedor
                      cursada={cursada}
                      titulo="Situación Final"
                    />
                  )} */}
              </Paper>
            </TabContext>
          </Paper>
          {/* </CardContent>
          </CardMainPage> */}
        </Grid>
      </Grid>
    </>
  );
}
