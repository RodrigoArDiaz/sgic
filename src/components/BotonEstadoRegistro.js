import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
//import {AltaGrupo} from './AltaGrupo';
//import {BajaGrupo} from './BajaGrupo';

import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { InputAdornment, Tooltip } from "@mui/material";
import { Grid } from "@mui/material";
import Zoom from "@mui/material/Zoom";

import CircularProgress from "@mui/material/CircularProgress";
export const BotonEstadoRegistro = (props) => {
  const [salto, setSalto] = React.useState(props.estado);

  if (salto === "1") {
    return (
      <InputAdornment position="end">
        {/* <Grid item xs={12} sm="auto"> */}
        <Tooltip title="Verificado" TransitionComponent={Zoom} arrow>
          <IconButton aria-label="verificado" size="small" color="success">
            <CheckIcon />
          </IconButton>
        </Tooltip>
        {/* </Grid>s */}
      </InputAdornment>
    );
  }

  if (salto === "2") {
    return (
      <InputAdornment position="end">
        {/* <Grid item xs={12} sm="auto"> */}
        <Tooltip title="Error" TransitionComponent={Zoom} arrow>
          <IconButton aria-label="error" size="small" color="error">
            <CloseIcon />
          </IconButton>
        </Tooltip>
        {/* </Grid> */}
      </InputAdornment>
    );
  }

  if (salto === "3") {
    return (
      <InputAdornment position="end">
        {/* <Grid item xs={12} sm="auto"> */}
        <Tooltip title="Verificando" TransitionComponent={Zoom} arrow>
          <IconButton aria-label="esperando" size="small">
            <CircularProgress />
          </IconButton>
        </Tooltip>
        {/* </Grid> */}
      </InputAdornment>
    );
  }
};
