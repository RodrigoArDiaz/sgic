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
import { Search } from "@mui/icons-material";
//
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

/*** Componente BuscarCatedras ***/
export default function BuscarCatedras(props) {
  //Peticion
  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  }

  function manejador() {
    var data = {
      pAn: form.anio,
      pSem: form.semestre,
      piB: form.bajas,
      Offset: 0,
      Limite: props.filasxpagina,
      pidMat: props.idmateria,
    };
    props.actualizar(data);
  }

  const [form, setForm] = useState({
    anio: "",
    semestre: "",
    bajas: "B",
  });

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
  const handleClickLimpiar1 = (e) => {
    setForm({
      ...form,
      anio: "",
    });
  };

  const handleClickLimpiar2 = (e) => {
    setForm({
      ...form,
      semestre: "",
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="anio"
            type="text"
            placeholder="Año"
            size="small"
            startAdornment={
              <InputAdornment position="start" sx={{ color: "icons.main" }}>
                <Search />
              </InputAdornment>
            }
            endAdornment={
              form.anio ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo anio"
                    onClick={() => {
                      handleClickLimpiar1("anio");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.anio}
            name="anio"
            sx={{ paddingRight: 0 }}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="semestre"
            type="text"
            placeholder="Semestre"
            size="small"
            endAdornment={
              form.semestre ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo semestre"
                    onClick={() => {
                      handleClickLimpiar2("semestre");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.semestre}
            name="semestre"
            sx={{ paddingRight: 0 }}
          />
        </FormControl>
      </Grid>

      <Grid item xs="auto" sm="auto" alignSelf="center">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                name="bajas"
                onChange={handleChecked}
                color="primary"
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
          <SearchIcon></SearchIcon>
        </Button>
      </Grid>
    </Grid>
  );
}
