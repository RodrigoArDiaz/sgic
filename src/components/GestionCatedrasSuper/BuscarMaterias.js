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
import { Box } from "@mui/system";
//Componentes personalizados
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

export default function BuscarMaterias(props) {
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
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="materia"
            type="text"
            placeholder="Materia o Código SIU"
            endAdornment={
              form.materia ? (
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
              ) : undefined
            }
            onChange={handleChange}
            value={form.materia}
            name="materia"
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="carrera"
            type="text"
            placeholder="Carrera o Código SIU"
            endAdornment={
              form.carrera ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo carrera"
                    onClick={() => {
                      handleClickLimpiar("carrera");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.carrera}
            name="carrera"
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="plan"
            type="text"
            placeholder="Plan o Código SIU"
            endAdornment={
              form.plan ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo plan"
                    onClick={() => {
                      handleClickLimpiar("plan");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.plan}
            name="plan"
            sx={{ paddingRight: 0 }}
            size="small"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={2}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox defaultChecked name="bajas" onChange={handleChecked} />
            }
            label="Incluir bajas"
          />
        </FormGroup>
      </Grid>

      <Grid item xs={12} sm={6} lg={3} xl={1}>
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
  );
}
