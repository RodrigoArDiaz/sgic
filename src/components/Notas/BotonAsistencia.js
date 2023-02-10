import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
//import {AltaGrupo} from './AltaGrupo';
//import {BajaGrupo} from './BajaGrupo';

import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
export const BotonAsistencia = () => {
  const [salto, setSalto] = React.useState("2");

  function manejador() {
    if (salto === "1") {
      setSalto("2");
    }
    if (salto === "2") {
      setSalto("1");
    }
  }

  if (salto === "1") {
    return (
      <Tooltip title="Completa">
        <IconButton
          aria-label="asistencia"
          color="success"
          onClick={() => manejador()}
        >
          <CheckIcon />
        </IconButton>
      </Tooltip>

      /*
        <Button  onClick={()=>manejador()}><AltaGrupo/></Button>
        <Button  disabled><AltaGrupo/></Button>
  */
    );
  }

  if (salto === "2") {
    return (
      <Tooltip title="Incompleta">
        <IconButton
          aria-label="inasistencia"
          color="error"
          onClick={() => manejador()}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
    );
  }
};
