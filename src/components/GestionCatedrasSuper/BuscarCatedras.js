import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Tooltip, Zoom } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { Search } from "@mui/icons-material";

//Valor inicial
/*const formInicial = {
  catedra: "",
  bajas: false,
}*/

export default function BuscarCatedras(props) {
  //variable de

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
      Catedra: form.catedra,
      Bajas: form.bajas,
      Offset: 0,
      Limite: props.filasxpagina,
    };
    props.actualizar(data);
    /*
consultas(data,'http://127.0.0.1:8000/api/buscarcatedras').then(response=>{
//console.log(response);
props.actualizar(response);

})
.catch(error=>{console.log("Error de conexión"+error);});  

*/
  }

  const [form, setForm] = useState({
    catedra: "",
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
    <Grid container spacing={1}>
      <Grid item>
        <FormControl fullWidth>
          <OutlinedInputSearch
            id="standard-adornment-password"
            type="text"
            placeholder="Catedra"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            endAdornment={
              form.catedra ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickLimpiar}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            onChange={handleChange}
            value={form.catedra}
            name="catedra"
            sx={{ paddingRight: 0 }}
            size="small"
          />
          {/* <Input
            id="standard-adornment-password"
            type="text"
            placeholder="Catedra"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickLimpiar}
                  // onMouseDown={handleMouseDownPassword}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
            onChange={handleChange}
            value={form.catedra}
            name="catedra"
          /> */}
        </FormControl>
      </Grid>

      <Grid item>
        <FormGroup>
          <FormControlLabel
            control={
              <Tooltip title="Incluir bajas" TransitionComponent={Zoom}>
                <Checkbox
                  defaultChecked
                  name="bajas"
                  onChange={handleChecked}
                />
              </Tooltip>
            }
            label=""
          />
        </FormGroup>
      </Grid>
      <Grid item xs="auto" sm="auto" alignSelf="center">
        <Button
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
