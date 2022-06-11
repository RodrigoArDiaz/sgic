import React, { useState, useEffect } from "react";
//MUI
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
//React redux
import { useSelector } from "react-redux";

export default function BuscarMaterias(props) {
  //Se recupera los datos de la catedra seleccionada
  const { idCatedra } = useSelector((state) => state.catedra);

  function manejador() {
    var data = {
      pMat: form.materia,
      piB: "A",
      Offset: 0,
      Limite: props.filasxpagina,
      pidCa: idCatedra,
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
              placeholder="Materia"
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
