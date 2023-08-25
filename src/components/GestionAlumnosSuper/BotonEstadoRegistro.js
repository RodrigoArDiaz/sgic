import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { Zoom } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

/*** Componente BotonEstadoRegistro ***/
export const BotonEstadoRegistro = (props) => {
  const [salto, setSalto] = React.useState(props.estado);

  if (salto === "1") {
    return (
      <Tooltip title="Verificado" TransitionComponent={Zoom}>
        <IconButton aria-label="verificado" size="small" color="success">
          <CheckIcon />
        </IconButton>
      </Tooltip>
    );
  }

  if (salto === "2") {
    return (
      <Tooltip title="Error" TransitionComponent={Zoom}>
        <IconButton aria-label="error" size="small" color="error">
          <CloseIcon />
        </IconButton>
      </Tooltip>
    );
  }

  if (salto === "3") {
    return (
      <Tooltip title="Verificando" TransitionComponent={Zoom}>
        <IconButton aria-label="esperando" size="small">
          <CircularProgress />
        </IconButton>
      </Tooltip>
    );
  }
};
