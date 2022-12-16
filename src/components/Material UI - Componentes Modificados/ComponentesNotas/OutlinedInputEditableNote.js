import React from "react";
import { green, red } from "@mui/material/colors";
import { OutlinedInputEditable } from "./ComponentesNotas";

/*****************************
 * Determinar Estilo del input
 */
const determinarEstilo = (nota, notaMin) => {
  if (nota == "") return {};
  if (nota < notaMin)
    return {
      backgroundColor: red[50],
      color: red["A700"],
      fontWeight: "500",
      borderRadius: "5px!important",
      //   "& fieldset.MuiOutlinedInput-notchedOutline": {
      // outlineColor: red[800] + "!important",
      // borderColor: red[800] + "!important",
      //   },
    };
  else
    return {
      backgroundColor: green[50],
      color: green[900],
      fontWeight: "500",
      borderRadius: "5px!important",
      //   "& fieldset.MuiOutlinedInput-notchedOutline": {
      // outlineColor: green[800] + "!important",
      // borderColor: green[800] + "!important",
      //   },
    };
};

/******************************
 * Componente
 */
const OutlinedInputEditableNote = (props) => {
  return (
    <OutlinedInputEditable
      {...props}
      sx={determinarEstilo(props.notaEstilo, props.notaMinEstilo)}
    />
  );
};

export default OutlinedInputEditableNote;
