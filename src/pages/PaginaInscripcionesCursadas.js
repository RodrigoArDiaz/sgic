import React from "react";
import { Grid } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";
import BuscarCatedras from "../components/BuscarCatedras";
import CatedrasContenedor from "../components/CatedrasContenedor";
import LsitaCursadasInscripcion from "../components/ListaCursadasInscripcion";
import ListaCursadasInscripcion from "../components/ListaCursadasInscripcion";
import InscripcionesCard from "../components/InscripcionesCard";

const gridSpacing = 3;
export default function PaginaInscripcionesCursadas() {
  return (
    <Grid
      container
      spacing={gridSpacing}
      sx={{
        ml: { xs: "0", sm: "1rem" },
        mr: { xs: "0", sm: "1rem" },
        mt: "80px",
        background: "#fff",
        paddingBottom: "2rem",
        paddingRight: "1.5rem",
        borderRadius: "4px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <ListaCursadasInscripcion />
        </Grid>
      </Grid>
    </Grid>
  );
}
