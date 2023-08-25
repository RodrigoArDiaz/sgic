import React from "react";
import { green, red } from "@mui/material/colors";
import { OutlinedInputEditable } from "./ComponentesNotas";

/*****************************
 * Determinar Estilo del input
 */
const determinarEstilo = (nota, notaMin) => {
  //Nota es null (no tiene nota)
  if (nota === "" || nota < 0 || nota == null || nota == undefined) return {};
  //Nota menor a nota minima
  if (nota < notaMin) {
    return {
      color: red["A700"],
      fontWeight: "500",
      borderRadius: "5px!important",
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        borderColor: red["A700"] + "!important",
        borderRadius: 0,
      },
    };
  }
  //Nota es mayor o igual a nota minima
  else
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
};

/**************************************
 * Componente OutlinedInputEditableNote
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
