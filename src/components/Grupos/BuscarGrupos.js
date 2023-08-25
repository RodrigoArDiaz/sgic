import React, { useState } from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
//
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

const formInicial = {
  grupo: "",
  tema: "",
  modulo: "",
  bajas: false,
};

/*** Componente BuscarGrupos***/
export default function BuscarGrupos(props) {
  const [form, setForm] = useState(formInicial);

  function manejador() {
    var data = {
      pGrupo: form.grupo,
      pTema: form.tema,
      pModulo: form.modulo,

      piB: form.bajas,
      Offset: 0,
      Limite: props.filasxpagina,
      pidCu: props.cursada.IdCursada,
    };

    props.actualizar(data);
  }

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
    <>
      <Grid container spacing={1}>
        <Grid item>
          <FormControl fullWidth>
            <OutlinedInputSearch
              id="grupo"
              type="text"
              placeholder="Grupo"
              size="small"
              endAdornment={
                form.grupo ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Limpiar campo grupo"
                      onClick={() => {
                        handleClickLimpiar("grupo");
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              onChange={handleChange}
              value={form.grupo}
              name="grupo"
            />
          </FormControl>
        </Grid>

        <Grid item>
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

        <Grid item>
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

        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  name="bajas"
                  onChange={handleChecked}
                />
              }
              label="Incluir bajas"
            />
          </FormGroup>
        </Grid>

        <Grid item xs="auto" sm="auto" alignSelf="center">
          <Button
            // startIcon={<SearchIcon />}
            color="primary"
            variant="outlined"
            onClick={() => {
              manejador();
            }}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
