import * as React from "react";

import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

/*** Componente BotonEstadoRegistro***/
export const BotonEstadoRegistro = (props) => {
  const [salto, setSalto] = React.useState(props.estado);

  if (salto === "1") {
    return (
      <Grid item xs={12} sm="auto">
        <Tooltip title="Verificado">
          <IconButton aria-label="verificado" size="small" color="success">
            <CheckIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  }

  if (salto === "2") {
    return (
      <Grid item xs={12} sm="auto">
        <Tooltip title="Error">
          <IconButton aria-label="error" size="small" color="error">
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  }

  if (salto === "3") {
    return (
      <Grid item xs={12} sm="auto">
        <Tooltip title="Verificando">
          <IconButton aria-label="esperando" size="small">
            <CircularProgress />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  }
};
