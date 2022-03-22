import React, { useState, useEffect } from "react";
//MUI
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
import { useSelector } from "react-redux";

export default function BuscarCatedras(props) {
  //Recupero informacion de la materia
  const { idMateria } = useSelector((state) => state.materia);

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
      pidMat: idMateria,
    };
    props.actualizar(data);
  }

  const [form, setForm] = useState({
    anio: "",
    semestre: "",
    bajas: "B",
  });

  //const [form, setForm] = useState(formInicial);

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
  const handleClickLimpiar = (e) => {
    setForm({
      ...form,
      catedra: "",
    });
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        mt: "10px",
        px: 2,
      }}
      elevation={3}
    >
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="flex-center"
      >
        <Grid item>
          <FormControl sx={{ m: 0.4 }} variant="standard">
            <Input
              id="anio"
              type="text"
              placeholder="Año"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo materia"
                    onClick={() => {
                      handleClickLimpiar("anio");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange}
              value={form.anio}
              name="anio"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 0.4 }} variant="standard">
            <Input
              id="semestre"
              type="text"
              placeholder="Semestre"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo semestre"
                    onClick={() => {
                      handleClickLimpiar("semestre");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange}
              value={form.semestre}
              name="semestre"
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
            startIcon={<SearchIcon />}
            color="secondary"
            onClick={() => {
              manejador();
            }}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
