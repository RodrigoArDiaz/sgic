import * as React from "react";
//MUI
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";

/*** Componente BotonTipoExamen ***/
export default function BotonTipoExamen(props) {
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
      <InputLabel htmlFor="tipo">Tipo</InputLabel>
      <Select value={anio} onChange={handleChange} displayEmpty>
        {/* <MenuItem value="">Tipo</MenuItem> */}
        <MenuItem value={"Q"}>Quiz</MenuItem>
        <MenuItem value={"P"}>Parcial</MenuItem>
        <MenuItem value={"F"}>Final</MenuItem>
      </Select>
    </>
  );
}
