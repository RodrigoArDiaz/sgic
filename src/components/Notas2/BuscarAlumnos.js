import React, { useState } from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import {
  CustomerToggleButton,
  OutlinedInputSearch,
} from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

const formInicial = {
  nombres: "",
  apellidos: "",
  libreta: "",
};

export default function BuscarAlumnos(props) {
  const [form, setForm] = useState(formInicial);

  function manejador() {
    var data = {
      pNom: form.nombres,
      pAp: form.apellidos,
      pLib: form.libreta,
      pGru: "",
      Offset: 0,
      Limite: props.filasxpagina,
      pidCu: props.cursada.IdCursada,
    };

    props.actualizar(data);
  }

  //handle para campo 'catedra'
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //handle para campo 'bajas'
  const handleChecked = (e) => {
    // const {name, value} = e.target;
    if (e.target.checked === true) {
      setForm({
        ...form,
        [e.target.name]: "B",
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: "A",
      });
    }
  };

  //handle para boton 'limpiar'
  const handleClickLimpiar = (inputName) => {
    setForm({
      ...form,
      [inputName]: "",
    });
  };

  return (
    <Box paddingX={2} paddingY={2}>
      <Grid container spacing={1}>
        <Grid item xs={11} sm={5} lg={2.5} xl={2}>
          <FormControl fullWidth>
            <OutlinedInputSearch
              id="nombres"
              type="text"
              placeholder="Nombres"
              size="small"
              endAdornment={
                form.nombres ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Limpiar campo nombres"
                      onClick={() => {
                        handleClickLimpiar("nombres");
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              onChange={handleChange}
              value={form.nombres}
              name="nombres"
            />
          </FormControl>
        </Grid>

        <Grid item xs={11} sm={5} lg={2.5} xl={2}>
          <FormControl fullWidth>
            <OutlinedInputSearch
              id="apellidos"
              type="text"
              placeholder="Apellidos"
              size="small"
              endAdornment={
                form.apellidos ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Limpiar campo apellidos"
                      onClick={() => {
                        handleClickLimpiar("apellidos");
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              onChange={handleChange}
              value={form.apellidos}
              name="apellidos"
            />
          </FormControl>
        </Grid>

        <Grid item xs={11} sm={5} lg={2.5} xl={2}>
          <FormControl fullWidth>
            <OutlinedInputSearch
              id="libreta"
              type="text"
              placeholder="Libreta"
              size="small"
              endAdornment={
                form.libreta ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Limpiar campo libreta"
                      onClick={() => {
                        handleClickLimpiar("libreta");
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              onChange={handleChange}
              value={form.libreta}
              name="libreta"
            />
          </FormControl>
        </Grid>

        <Grid item xs="auto" sm="auto" alignSelf="center">
          <CustomerToggleButton
            value="check"
            size="small"
            selected={false}
            onClick={() => {
              manejador();
            }}
          >
            <SearchIcon color="primary" />
          </CustomerToggleButton>
        </Grid>
      </Grid>
    </Box>
  );
}
