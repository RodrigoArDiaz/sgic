import React, { useState } from "react";
//MUI
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import {
  ArticleOutlined,
  AssignmentOutlined,
  GradingOutlined,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
//
import NotasPracticosContenedor from "./NotasPracticosContenedor";
import NotasExamenesContenedor from "./NotasExamenesContenedor";
import { TabCustom } from "../../Material UI - Componentes Modificados/TabCustom";
import SituacionFinalContenedor from "./SituacionFinalContenedor";

/*** Componente MisNotasContenedor ***/
export default function MisNotasContenedor() {
  const [tabState, setTabState] = useState("1");
  const handleChange = (event, newValue) => {
    setTabState(newValue);
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
          Mis notas
        </Typography>
      </Box>

      {/* <Grid item xs={12}>
        <SituacionFinalContenedor />
      </Grid> */}

      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: "transparent",
          }}
        >
          <TabContext value={tabState}>
            <Box
              sx={{
                padding: 0,
              }}
              paddingX={2}
            >
              <TabList onChange={handleChange} aria-label="notas">
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
                  label="Situación final"
                  value="3"
                  icon={<GradingOutlined fontSize="small" />}
                  iconPosition="start"
                />
              </TabList>
              <Divider />
            </Box>

            <Box>
              <TabPanel value="1" sx={{ paddingX: 0, paddingY: 0 }}>
                <NotasPracticosContenedor />
              </TabPanel>

              <TabPanel
                value="2"
                sx={{ paddingX: "0", paddingTop: 0, paddingBottom: 0 }}
              >
                <NotasExamenesContenedor />
              </TabPanel>

              <TabPanel
                value="3"
                sx={{ paddingX: "0", paddingTop: 0, paddingBottom: 0 }}
              >
                <SituacionFinalContenedor />
              </TabPanel>
            </Box>
          </TabContext>
        </Paper>
      </Grid>
    </>
  );
}
