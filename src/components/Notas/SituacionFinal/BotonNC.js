import * as React from "react";
//MUI
import FormControl from "@mui/material/FormControl";
import { green, red } from "@mui/material/colors";
//
import { OutlinedInputEditable } from "../../Material UI - Componentes Modificados/ComponentesNotas/ComponentesNotas";

/*****************************
 * Determinar Estilo del input
 */
const determinarEstilo = (condicion, nota) => {
  if (condicion === undefined) {
    return {};
  } else if (nota == 0 || nota == "-") {
    return {};
  } else if (condicion > 0) {
    return {
      color: red["A700"],
      fontWeight: "500",
      borderRadius: "5px!important",
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        borderColor: red["A700"] + "!important",
        borderRadius: 0,
      },
    };
  } else {
    return {
      color: green[900],
      fontWeight: "500",
      borderRadius: "5px!important",
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px solid",
        borderColor: green[800] + "!important",
        borderRadius: 0,
      },
    };
  }
};

/*** Componente BotonNC ***/
export default function BotonNC(props) {
  function Transformar(param) {
    if (param === 0) {
      return "-";
    }
    return param;
  }

  return (
    <FormControl sx={{ m: 1, width: 51 }} variant="outlined">
      <OutlinedInputEditable
        sx={determinarEstilo(props.Cond, props.Nota)}
        id="outlined-adornment-weight"
        value={Transformar(props.Nota)}
        size="small"
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          readOnly: true,
        }}
      />
    </FormControl>
  );
}
