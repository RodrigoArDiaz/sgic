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

//Valor inicial
const formInicial = {
  apellidos: "",
  nombres: "",
  dni: "",
  email: "",
  bajas: false,
};

export default function BuscarGrupos() {
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
            type="text"
            placeholder="Nombre"
            endAdornment={
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
            }
            onChange={handleChange}
            value={form.nombre}
            name="nombre"
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="tema"
            type="text"
            placeholder="Tema"
            endAdornment={
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
            }
            onChange={handleChange}
            value={form.tema}
            name="tema"
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="modulo"
            type="text"
            placeholder="Módulo"
            endAdornment={
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
            }
            onChange={handleChange}
            value={form.modulo}
            name="modulo"
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item>
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
