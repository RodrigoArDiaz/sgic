import React, { useState } from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import {
  CustomerToggleButton,
  OutlinedInputSearch,
} from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

const formInicial = {
  grupo: "",
};

export default function BuscarGrupos(props) {
  const [form, setForm] = useState(formInicial);

  function manejador() {
    var data = {
      pNom: "",
      pAp: "",
      pLib: "",
      pGru: form.grupo,

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
    <Box paddingX={2} paddingY={2}>
      <Grid container spacing={1}>
        <Grid item xs={11} sm={5} lg={2.5} xl={2}>
          <FormControl fullWidth>
            <OutlinedInputSearch
              id="grupo"
              type="text"
              placeholder="Grupo"
              size="small"
              endAdornment={
                form.grupo ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Limpiar campo grupo"
                      onClick={() => {
                        handleClickLimpiar("grupo");
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              onChange={handleChange}
              value={form.grupo}
              name="grupo"
            />
          </FormControl>
        </Grid>

        <Grid item xs="auto" sm="auto" alignSelf="center">
          {/* <CustomerToggleButton
            value="check"
            size="small"
            selected={false}
            onClick={() => {
              manejador();
            }}
          > */}
          <Button
            variant="outlined"
            onClick={() => {
              manejador();
            }}
          >
            <SearchIcon color="primary" />
          </Button>

          {/* </CustomerToggleButton> */}
        </Grid>
      </Grid>
    </Box>
  );
}
