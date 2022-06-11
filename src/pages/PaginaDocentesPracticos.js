import React from "react";
import { Grid } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";
import PracticosContenedor from "../components/Practicos2/PracticosContenedor";
import BuscarPracticos from "../components/Practicos/BuscarPracticos";

export default function PaginaDocentesPracticos(props) {
  return <PracticosContenedor cursada={props.cursada} />;
}
