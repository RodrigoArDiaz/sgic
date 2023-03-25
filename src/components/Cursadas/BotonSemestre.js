import * as React from "react";
//MUI
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, InputLabel } from "@mui/material";

/*** Componente BotonSemestre ***/
export default function BotonSemestre(props) {
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
    <>
      <InputLabel id="semestre">Semestre</InputLabel>
      <Select value={anio} onChange={handleChange} displayEmpty>
        <MenuItem value={"1"}>1</MenuItem>
        <MenuItem value={"2"}>2</MenuItem>
        <MenuItem value={"3"}>3</MenuItem>
        <MenuItem value={"4"}>4</MenuItem>
        <MenuItem value={"5"}>5</MenuItem>
        <MenuItem value={"6"}>6</MenuItem>
        <MenuItem value={"7"}>7</MenuItem>
        <MenuItem value={"8"}>8</MenuItem>
        <MenuItem value={"9"}>9</MenuItem>
        <MenuItem value={"10"}>10</MenuItem>
      </Select>
    </>
  );
}
