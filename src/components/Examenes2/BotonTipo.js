import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BotonTipo(props) {
  const [anio, setAnio] = React.useState(Valor(props.vpd));

  const [dato, setParam] = React.useState(props.dato);
  //const [activar, setA] = React.useState(props.activar);

  const handleChange = (event) => {
    setAnio(event.target.value);
    props.Cambio(event.target.value);
    if (event.target.value !== "") {
      let valor = dato.res.find((x) => x.IdParametro === event.target.value);
      //console.log(valor);
      props.CambioNM(valor.Escala);
    } else {
      props.CambioNM("");
    }
  };

  function Valor(param) {
    if (param === undefined) {
      return "";
    }
    return param;
  }

  function Tipo(param) {
    if (param === "P") return "Parcial";
    if (param === "Q") return "Quiz";
    if (param === "F") return "Final";
  }

  console.log(dato.res);
  //if(activar==='1')
  //{
  return (
    <Box sx={{ minWidth: 50 }}>
      <FormControl fullWidth>
        <Select
          value={anio}
          onChange={handleChange}
          displayEmpty
          //inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">Tipo</MenuItem>
          {dato.res.map((row) => {
            return (
              <MenuItem value={row.IdParametro} key={row.Tipo}>
                {Tipo(row.Tipo)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
