import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/*** Componente BotonAnio ***/
export default function BotonAnio(props) {
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
        <Select value={anio} onChange={handleChange} displayEmpty>
          <MenuItem value="">Año</MenuItem>
          <MenuItem value={"2022"}>2022</MenuItem>
          <MenuItem value={"2023"}>2023</MenuItem>
          <MenuItem value={"2024"}>2024</MenuItem>
          <MenuItem value={"2025"}>2025</MenuItem>
          <MenuItem value={"2026"}>2026</MenuItem>
          <MenuItem value={"2027"}>2027</MenuItem>
          <MenuItem value={"2028"}>2028</MenuItem>
          <MenuItem value={"2029"}>2029</MenuItem>
          <MenuItem value={"2030"}>2030</MenuItem>
          <MenuItem value={"2031"}>2031</MenuItem>
          <MenuItem value={"2032"}>2032</MenuItem>
          <MenuItem value={"2033"}>2033</MenuItem>
          <MenuItem value={"2034"}>2034</MenuItem>
          <MenuItem value={"2035"}>2035</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
