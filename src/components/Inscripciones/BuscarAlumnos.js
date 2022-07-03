import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

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
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} lg={3} xl={3}>
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

      <Grid item xs={12} sm={6} lg={3} xl={3}>
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

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="dni"
            type="text"
            placeholder="Documento"
            size="small"
            endAdornment={
              form.dni ? (
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
              ) : undefined
            }
            onChange={handleChange}
            value={form.dni}
            name="dni"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="email"
            type="text"
            placeholder="Correo"
            size="small"
            endAdornment={
              form.email ? (
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
              ) : undefined
            }
            onChange={handleChange}
            value={form.email}
            name="email"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
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
        <Box>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<SearchIcon />}
            onClick={() => {
              manejador();
            }}
          >
            Buscar
          </Button>

          {/* <IconButton
            sx={{ p: "10px" }}
            aria-label="Buscar usuarios"
            onClick={() => {
              manejador();
            }}
          >
            <SearchIcon />
          </IconButton> */}
        </Box>
      </Grid>
    </Grid>
  );
}
