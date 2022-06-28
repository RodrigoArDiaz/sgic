import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";

export default function BuscarAlumnos(props) {
  function manejador() {
    var data = {
      pMail: form.email,
      pDoc: form.dni,
      pLib: form.libreta,
      pNom: form.nombres,
      pAp: form.apellidos,
      Offset: 0,
      Limite: props.filasxpagina,
      pidCu: props.cursada.IdCursada,
    };

    props.actualizar(data);
  }

  const [form, setForm] = useState({
    apellidos: "",
    nombres: "",
    dni: "",
    email: "",
  });

  //handle para inputs de busqueda
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
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
              id="apellidos"
              type="text"
              placeholder="Apellidos"
              endAdornment={
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
              }
              onChange={handleChange}
              value={form.apellidos}
              name="apellidos"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 0.4 }} variant="standard">
            <Input
              id="nombres"
              type="text"
              placeholder="Nombres"
              endAdornment={
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
              }
              onChange={handleChange}
              value={form.nombres}
              name="nombres"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 0.4 }} variant="standard">
            <Input
              id="dni"
              type="text"
              placeholder="Documento"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo dni"
                    onClick={() => {
                      handleClickLimpiar("dni");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange}
              value={form.dni}
              name="dni"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 0.4 }} variant="standard">
            <Input
              id="email"
              type="text"
              placeholder="Correo"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo email"
                    onClick={() => {
                      handleClickLimpiar("email");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange}
              value={form.email}
              name="email"
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl sx={{ m: 0.4 }} variant="standard">
            <Input
              id="libreta"
              type="text"
              placeholder="Libreta"
              endAdornment={
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
              }
              onChange={handleChange}
              value={form.libreta}
              name="libreta"
            />
          </FormControl>
        </Grid>

        <Grid item xs="auto" sm="auto" alignSelf="center">
          <Box>
            <IconButton
              // type="submit"
              sx={{ p: "10px" }}
              aria-label="Buscar usuarios"
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
