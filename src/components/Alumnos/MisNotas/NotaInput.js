import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { OutlinedInputEditable } from "../../Material UI - Componentes Modificados/ComponentesNotas/ComponentesNotas";
import { green, red } from "@mui/material/colors";

/*****************************
 * Determinar Estilo del input
 */
const determinarEstilo = (condicion, nota) => {
  if (condicion === undefined) {
    return {};
  } else if (nota == 0 || nota == "-" || Number(nota) < 0) {
    return {};
  } else if (condicion > 0) {
    return {
      // backgroundColor: red[50],
      color: red["A700"],
      fontWeight: "500",
      borderRadius: "5px!important",
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        // outlineColor: red[800] + "!important",
        // borderColor: red[800] + "!important",
        borderColor: red["A700"] + "!important",
        borderRadius: 0,
      },
    };
  } else {
    return {
      // backgroundColor: green[50],
      // borderColor: green[50],
      color: green[900],
      fontWeight: "500",
      borderRadius: "5px!important",
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        // outlineColor: green[800] + "!important",
        // borderColor: green[800] + "!important",
        borderWidth: "2px solid",
        borderColor: green[800] + "!important",
        borderRadius: 0,
      },
    };
  }
};

export default function NotaInput(props) {
  function Transformar(param) {
    if (param === 0 || Number(param) < 0) {
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
