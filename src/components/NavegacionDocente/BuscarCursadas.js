import React, { useState } from "react";
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
//redux
import { useSelector } from "react-redux";

export default function BuscarCursadas(props) {
  //Recupero informacion de la materia
  const { idMateria } = useSelector((state) => state.materia);

  function manejador() {
    var data = {
      pAn: form.anio,
      pSem: form.semestre,
      piB: "A",
      //pMat:form.materia,

      Offset: 0,
      Limite: props.filasxpagina,
      pidMat: idMateria,
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

        <Grid item xs="auto" sm="auto" alignSelf="center">
          <Box>
            <IconButton
              // type="submit"
              sx={{ p: "10px" }}
              aria-label="Buscar cursadas"
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
