import React from "react";
import { Card, CardContent, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
//import CatedraLista from '../CatedraLista';
//import { CrearInscripcion } from './CrearInscripcion';
//import { OrdenarExamen } from './OrdenarExamen';
import NotasPracticos from "./NotasPracticos";
import NotasExamenes from "./NotasExamenes";
import SituacionFinal from "./SituacionFinal";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";

export default function NotasContenedor() {
  const [salto, setSalto] = React.useState("1");

  function Modulo(props) {
    if (props.cambio === "1") {
      return (
        <CardMainPage
          // icon="playlist_add_check"
          icon="fact_check"
          title="Notas - Prácticos"
          bgColorIcon={blue[500]}
        >
          <CardContent>
            <Grid container>
              <Grid container>
                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" disabled>
                        Prácticos
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={() => setSalto("2")}>
                        Exámenes
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={() => setSalto("3")}>
                        Situación Final
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container pt={2}>
                <NotasPracticos />
              </Grid>
            </Grid>
          </CardContent>
        </CardMainPage>
      );
    }
    if (props.cambio === "2") {
      return (
        <CardMainPage
          // icon="playlist_add_check"
          icon="fact_check"
          title="Notas - Exámenes"
          bgColorIcon={blue[500]}
        >
          <CardContent>
            <Grid container>
              <Grid container>
                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={() => setSalto("1")}>
                        Prácticos
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" disabled>
                        Exámenes
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={() => setSalto("3")}>
                        Situación Final
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container pt={2}>
                <NotasExamenes />
              </Grid>
            </Grid>
          </CardContent>
        </CardMainPage>
      );
    }
    if (props.cambio === "3") {
      return (
        <CardMainPage
          // icon="playlist_add_check"
          icon="fact_check"
          title="Notas - Situación Final"
          bgColorIcon={blue[500]}
        >
          <CardContent>
            <Grid container>
              <Grid container>
                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={() => setSalto("1")}>
                        Prácticos
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={() => setSalto("2")}>
                        Exámenes
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* CrearPractico */}
                <Grid item xs={12} md={4}>
                  <Grid
                    container
                    paddingX={2}
                    paddingY={1}
                    justifyContent="flex-end"
                  >
                    <Grid item xs={12}>
                      <Button variant="contained" disabled>
                        Situación Final
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container pt={2}>
                <SituacionFinal />
              </Grid>
            </Grid>
          </CardContent>
        </CardMainPage>
      );
    }
  }

  return <Modulo cambio={salto} />;
}
