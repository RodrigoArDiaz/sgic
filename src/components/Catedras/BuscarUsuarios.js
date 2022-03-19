import React, { useState } from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//Componentes personalizados
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

export default function BuscarUsuarios(props) {
  //variable de estado del formulario

  function manejador() {
    var data = {
      pUs: "",
      pMail: form.email,
      pDoc: form.dni,
      pNom: form.nombres,
      pAp: form.apellidos,
      piB: form.bajas,
      Offset: 0,
      Limite: props.filasxpagina,
      pidCa: props.idcatedra,
    };

    props.actualizar(data);
  }

  const [form, setForm] = useState({
    apellidos: "",
    nombres: "",
    dni: "",
    email: "",
    bajas: "B",
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
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="nombres"
            type="text"
            placeholder="Nombres"
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
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="dni"
            type="text"
            placeholder="Documento"
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
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="email"
            type="text"
            placeholder="Correo"
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
            sx={{ paddingRight: 0 }}
            size="small"
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
  );
}
