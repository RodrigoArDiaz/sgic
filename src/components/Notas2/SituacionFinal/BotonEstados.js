import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { Grid } from "@mui/material";
import * as Responses from "../../Responses";
import { useNavigate } from "react-router-dom";

export default function BotonEstados(props) {
  const navegar = useNavigate();

  const [salto, setSalto] = React.useState("1");

  const [age, setAge] = React.useState(props.estado);

  const handleChange = (event) => {
    var data = {
      pEstado: event.target.value,
      pidUs: props.pidUs,
      pidCu: props.cursada.IdCursada,
    };
    setSalto("2");
    Responses.consultas(
      data,
      "http://127.0.0.1:8000/api/modificarestadoinscripto"
    )
      .then((response) => {
        if (Responses.status === 200) {
          props.mensaje(response.Mensaje);
          props.abrir(true);

          props.tipo("success");

          setSalto("1");
          setAge(event.target.value);
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          if (response.Advertencia !== undefined) {
            props.mensaje(response.Advertencia);
            props.abrir(true);

            props.tipo("warning");
            setSalto("1");
            setAge(event.target.value);
          } else {
            props.mensaje(response.Error);
            props.abrir(true);

            props.tipo("error");

            setSalto("1");
          }
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  };

  if (salto === "1") {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            size="small"
            //inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={"C"}>Cursando</MenuItem>
            <MenuItem value={"R"}>Regular</MenuItem>
            <MenuItem value={"A"}>Aprobado</MenuItem>
            <MenuItem value={"P"}>Promocionado</MenuItem>
            <MenuItem value={"L"}>Libre</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

  if (salto === "2") {
    //console.log("Paso por aqui 2");
    return (
      <Grid item xs={12} sm="auto">
        <Tooltip title="Verificando">
          <IconButton aria-label="estado3" size="small" color="inherit">
            <CircularProgress />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  }
}
