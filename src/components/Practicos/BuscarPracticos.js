import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { FilePresent, Search } from "@mui/icons-material";

//Valor inicial
const formInicial = {
  apellidos: "",
  nombres: "",
  dni: "",
  email: "",
  bajas: false,
};

export default function BuscarPracticos() {
  //variable de
  const [form, setForm] = useState(formInicial);

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
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  //handle para boton 'limpiar'
  const handleClickLimpiar = (inputName) => {
    setForm({
      ...form,
      [inputName]: "",
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            type="text"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            endAdornment={
              form.nombre ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo nombre"
                    onClick={() => {
                      handleClickLimpiar("nombre");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.nombre}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="tema"
            type="text"
            placeholder="Tema"
            size="small"
            endAdornment={
              form.tema ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo tema"
                    onClick={() => {
                      handleClickLimpiar("tema");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.tema}
            name="tema"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="modulo"
            type="text"
            placeholder="Módulo"
            size="small"
            endAdornment={
              form.modulo ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo modulo"
                    onClick={() => {
                      handleClickLimpiar("modulo");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.modulo}
            name="modulo"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="orden"
            type="text"
            placeholder="Orden"
            size="small"
            endAdornment={
              form.orden ? (
                <InputAdornment position="orden">
                  <IconButton
                    aria-label="Limpiar campo orden"
                    onClick={() => {
                      handleClickLimpiar("orden");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.orden}
            name="orden"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox defaultChecked name="bajas" onChange={handleChecked} />
            }
            label="Incluir bajas"
          />
        </FormGroup>
      </Grid>

      <Grid item xs="auto" sm="auto" alignSelf="center">
        <Button startIcon={<SearchIcon />} color="secondary">
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
}
