import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Grid, TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

//Valor inicial
const formInicial = {
  materia: "",
  carrera: "",
  planEstudio: "",
  codigoSIU: "",
};

export default function BuscarMaterias(props) {
  //variable de
  //const [form, setForm] = useState(formInicial);

  function manejador() {
    var data = {
      pMat: form.materia,
      pPla: form.plan,
      pCar: form.carrera,
      piB: form.bajas,
      Offset: 0,
      Limite: props.filasxpagina,
      pidCa: props.idcatedra,
    };

    props.actualizar(data);
  }

  const [form, setForm] = useState({
    materia: "",
    carrera: "",
    plan: "",
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

  const handleClickLimpiar = (inputName) => {
    setForm({
      ...form,
      [inputName]: "",
    });
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        // width: "100%",
        mt: "10px",
        px: 2,
        my: 3,
      }}
      elevation={1}
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
              id="materia"
              type="text"
              placeholder="Materia o Código SIU"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo materia"
                    onClick={() => {
                      handleClickLimpiar("materia");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange}
              value={form.materia}
              name="materia"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 0.4 }} variant="standard">
            <Input
              id="carrera"
              type="text"
              placeholder="Carrera o Código SIU"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      handleClickLimpiar("carrera");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange}
              value={form.carrera}
              name="carrera"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 0.4 }} variant="standard">
            <Input
              id="plan"
              type="text"
              placeholder="Plan o Código SIU"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      handleClickLimpiar("plan");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange}
              value={form.plan}
              name="plan"
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
          <Box>
            <IconButton
              // type="submit"
              sx={{ p: "10px" }}
              aria-label="Buscar materias"
              onClick={() => {
                manejador();
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

/*
        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="codigoSIU"
                    type='text'
                    placeholder='Codigo SIU'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickLimpiar}
                        // onMouseDown={handleMouseDownPassword}
                        >
                        <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.codigoSIU}
                    name='codigoSIU'
                />
            </FormControl> 
        </Grid>
        */
