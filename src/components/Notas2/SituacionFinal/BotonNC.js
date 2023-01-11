import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import OutlinedInputEditableNote from "../../Material UI - Componentes Modificados/ComponentesNotas/OutlinedInputEditableNote";
import { OutlinedInputEditable } from "../../Material UI - Componentes Modificados/ComponentesNotas/ComponentesNotas";

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
    <FormControl sx={{ m: 1, width: 51 }} variant="outlined">
      <OutlinedInputEditable
        sx={{ ...estilo, width: 50, height: 32 }}
        id="outlined-adornment-weight"
        value={Transformar(props.Nota)}
        size="small"
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          readOnly: true,
        }}
      />
    </FormControl>
    // <FormControl sx={{ m: 1, width: 59 }}>
    //   <OutlinedInputEditableNote
    //     id="note-id"
    //     type="text"
    //     placeholder="-"
    //     size="small"
    //     name="nota"
    //     value={Transformar(props.Nota)}
    //     notaEstilo={props.nota}
    //     notaMinEstilo={props.Cond}
    //   />
    // </FormControl>
  );
}
