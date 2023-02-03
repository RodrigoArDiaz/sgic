import React from "react";
import { Chip, IconButton, Tooltip, Typography, Zoom } from "@mui/material";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import CopiarButton from "../../CopiarButton";
import { isValidUrl } from "../../../helpers/valiidarUrl";

//Componente
export default function ECVisual({ label, type, ...props }) {
  React.useEffect(() => {
    console.log(props.valor);
  }, []);

  return (
    <>
      {props.valor == "-" || props.valor.trim() == "" ? (
        <Chip label={label} variant="outlined" color={type} />
      ) : (
        <>
          <Typography variant="body1">{props.valor}</Typography>

          {isValidUrl(props.valor) && (
            <Tooltip
              title={"Ir a " + props.valor}
              TransitionComponent={Zoom}
              arrow
              placement="top"
            >
              <IconButton color="secondary">
                <LinkOffOutlinedIcon
                  onClick={() => {
                    window.open(props.valor, "_blank");
                  }}
                />
              </IconButton>
            </Tooltip>
          )}

          <CopiarButton textoCopiar={props.valor} />
        </>
      )}
    </>
  );
}

// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import FormControl from "@mui/material/FormControl";

// export default function ECVisual(props) {
//   //const [texto, setT] = React.useState(props.valor);
//   return (
//     <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//       <OutlinedInput
//         id="outlined-adornment-weight"
//         value={props.valor}
//         size="small"
//         aria-describedby="outlined-weight-helper-text"
//         inputProps={{
//           readOnly: true,
//         }}
//       />
//     </FormControl>
//   );
// }
