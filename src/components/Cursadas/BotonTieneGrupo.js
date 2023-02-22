import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/*** Componente BotonTieneGrupo ***/
export default function BotonTieneGrupo(props) {
  const [anio, setAnio] = React.useState(Valor(props.vpd));

  const handleChange = (event) => {
    setAnio(event.target.value);
    props.Cambio(event.target.value);
  };

  function Valor(param) {
    if (param === undefined) {
      return "";
    }
    return param;
  }

  return (
    <Box sx={{ minWidth: 50 }}>
      <FormControl fullWidth>
        <Select
          value={anio}
          onChange={handleChange}
          displayEmpty
          //inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">Grupos</MenuItem>

          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
