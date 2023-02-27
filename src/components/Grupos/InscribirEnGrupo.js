import React from "react";
//MUI
import { Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import RedoIcon from "@mui/icons-material/Redo";
import { useModal } from "../useModal";
import ListarIntegrantesContenedor from "./InscribirEnGrupo/ListarIntegrantesContenedor";
import DialogFullCustom from "../Material UI - Componentes Modificados/DialogFullCustom";

/*** Componente InscribirEnGrupo***/
export const InscribirEnGrupo = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  React.useEffect(() => {
    console.log(props.grupo);
  }, []);

  return (
    <>
      <Tooltip title="Inscribir alumnos" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <RedoIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <DialogFullCustom
        open={isOpen}
        onClose={handleClose}
        title="Inscribir en grupo"
        subtitle={"Inscribir alumno a " + "'" + props.grupo.Grupo + "'"}
        icon="redo"
      >
        <ListarIntegrantesContenedor
          grupo={props.grupo}
          cursada={props.cursada}
        />
      </DialogFullCustom>
    </>
  );
};
