import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import OutlinedInputEditableNote from "../../Material UI - Componentes Modificados/ComponentesNotas/OutlinedInputEditableNote";
import { OutlinedInputEditable } from "../../Material UI - Componentes Modificados/ComponentesNotas/ComponentesNotas";
import { green, red } from "@mui/material/colors";

/*****************************
 * Determinar Estilo del input
 */
const determinarEstilo = (condicion) => {
  if (condicion === undefined) {
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

  // if (nota == "") return {};
  // if (nota < notaMin)
  //   return {
  //     // backgroundColor: red[50],
  //     color: red["A700"],
  //     fontWeight: "500",
  //     borderRadius: "5px!important",
  //     "& fieldset.MuiOutlinedInput-notchedOutline": {
  //       // outlineColor: red[800] + "!important",
  //       // borderColor: red[800] + "!important",
  //       borderColor: red["A700"] + "!important",
  //       borderRadius: 0,
  //     },
  //   };
  // else
  //   return {
  //     // backgroundColor: green[50],
  //     // borderColor: green[50],
  //     color: green[900],
  //     fontWeight: "500",
  //     borderRadius: "5px!important",
  //     "& fieldset.MuiOutlinedInput-notchedOutline": {
  //       // outlineColor: green[800] + "!important",
  //       // borderColor: green[800] + "!important",
  //       borderWidth: "2px solid",
  //       borderColor: green[800] + "!important",
  //       borderRadius: 0,
  //     },
  //   };
};

export default function ECVisual(props) {
  function Transformar(param) {
    if (param === 0) {
      return "-";
    }
    return param;
  }

  const style3 = {
    //Blancogris
    width: { xs: 50 },
    backgroundColor: { xs: "#f5f5f5" },
  };

  const style2 = {
    width: { xs: 50 },
    backgroundColor: { xs: "#fdeae6" },
  };

  const style1 = {
    width: { xs: 50 },
    backgroundColor: { xs: "#e6fde9" },
  };

  var estilo;

  if (props.Cond === undefined) {
    estilo = style3;
  } else if (props.Cond > 0) {
    estilo = style2;
  } else {
    estilo = style1;
  }

  React.useEffect(() => {
    console.log(props.ex, props.Nota, props.Cond);
  }, []);

  return (
    // <FormControl sx={{ m: 1, width: 51 }} variant="outlined">
    //   <OutlinedInputEditable
    //     sx={{ ...estilo, width: 50, height: 32 }}
    //     id="outlined-adornment-weight"
    //     value={Transformar(props.Nota)}
    //     size="small"
    //     aria-describedby="outlined-weight-helper-text"
    //     inputProps={{
    //       readOnly: true,
    //     }}
    //   />
    // </FormControl>
    <FormControl sx={{ m: 1, width: 51 }} variant="outlined">
      <OutlinedInputEditable
        sx={determinarEstilo(props.Cond)}
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
