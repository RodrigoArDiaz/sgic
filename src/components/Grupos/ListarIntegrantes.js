import React from "react";
//MUI
import { Zoom } from "@mui/material";
import { useModal } from "../useModal";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
//
import ListarIntegrantesContenedor from "./ListarIntegrantes/ListarIntegrantesContenedor";
import DialogFullCustom from "../Material UI - Componentes Modificados/DialogFullCustom";

/*** Componente ListarIntegrantes***/
export const ListarIntegrantes = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  return (
    <>
      <Tooltip title="Listar integrantes" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton
            aria-label="listar"
            size="small"
            color="secondary"
            onClick={handleOpen}
          >
            <SupervisorAccountOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <DialogFullCustom
        open={isOpen}
        onClose={handleClose}
        title="Listar integrantes"
        subtitle={"Integrantes: " + props.grupo.Grupo}
        icon="supervisor_account_outlined"
      >
        <ListarIntegrantesContenedor
          cursada={props.cursada}
          grupo={props.grupo}
        />
      </DialogFullCustom>
    </>
  );
};
