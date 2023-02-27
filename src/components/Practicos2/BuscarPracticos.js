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
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

const formInicial = {
  practico: "",
  orden: "",
  bajas: "B",
};

/*** Componente BuscarPracticos ***/
export default function BuscarPracticos(props) {
  const [form, setForm] = useState(formInicial);

  function manejador() {
    var data = {
      pPractico: form.practico,
      pOrden: form.orden,
      piB: form.bajas,
      Offset: 0,
      Limite: props.filasxpagina,
      pidCu: props.cursada.IdCursada,
    };

    props.actualizar(data);
  }

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
      <Grid item>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="practico"
            type="text"
            placeholder="Práctico"
            size="small"
            endAdornment={
              form.practico ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo practico"
                    onClick={() => {
                      handleClickLimpiar("practico");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.practico}
            name="practico"
          />
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="orden"
            type="text"
            placeholder="Orden"
            size="small"
            endAdornment={
              form.orden ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Limpiar campo orden"
                    onClick={() => {
                      handleClickLimpiar("orden");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.orden}
            name="orden"
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
                color="primary"
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
  );
}
