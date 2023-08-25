import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import * as Responses from "../Responses";
import { useNavigate } from "react-router-dom";
import {
  TableCell1em,
  TableCellHead,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Zoom,
} from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useModal } from "../../hooks/useModal";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";
import AvatarCustom from "../Material UI - Componentes Modificados/AvatarCustom";
import { routes } from "../../routes";
import { endpoints } from "../../api/endpoints";

//Componente
const BotonListarIntegrantesGrupo = ({ IdGrupo, IdCursada, NombreGrupo }) => {
  const navegar = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const [est, setE] = React.useState("1");
  const [grupos, setG] = React.useState();

  return (
    <>
      <Tooltip title="Listar integrantes" TransitionComponent={Zoom} arrow>
        <IconButton
          color="secondary"
          aria-label="expand row"
          size="small"
          onClick={() => {
            //Se abre modal
            handleOpen();

            //Data a enviar
            var data = {
              pidG: IdGrupo,
              Offset: 0,
              pidCu: IdCursada,
            };
            setE("1");

            //Peticion
            Responses.consultas(data, endpoints.listarIntegrantes)
              .then((response) => {
                if (Responses.status === 200) {
                  setG(response.res);
                  setE("2");
                  console.log(response);
                } else if (Responses.status === 401) {
                  navegar(routes.iniciarSesion);
                } else {
                  navegar(routes.error);
                }
              })
              .catch((error) => {
                navegar("/error");
              });
            // }
          }}
        >
          <GroupsOutlinedIcon />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <DialogCustom open={isOpen} onClose={handleClose}>
        <DialogTitle display="flex" flexDirection="row">
          <GroupsOutlinedIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Integrantes {NombreGrupo}
        </DialogTitle>
        <DialogContent sx={{ paddingX: 0 }}>
          {est == 1 && (
            <Box component="div" display="flex" justifyContent="center">
              <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
            </Box>
          )}

          {est == 2 && (
            <Table
              size="medium"
              aria-label="purchases"
              sx={{ borderCollapse: "collapse" }}
            >
              <TableHead>
                <TableRow>
                  <TableCellHead>Apellidos</TableCellHead>
                  <TableCellHead>Nombres</TableCellHead>
                  <TableCellHead align="right">Documento</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {grupos.map((g, index) => (
                  <TableRow
                    hover
                    key={g.Documento}
                    sx={{
                      borderTop: "1px solid #e0e0e0",
                      borderBottom: "none",
                    }}
                  >
                    <TableCell1em component="th" scope="row">
                      <Box display="flex" gap={1} alignItems="center">
                        <AvatarCustom
                          valueOne={g.Apellidos}
                          valueTwo={g.Nombres}
                          outlined={true}
                        />

                        {g.Apellidos}
                      </Box>
                    </TableCell1em>
                    <TableCell1em>{g.Nombres}</TableCell1em>
                    <TableCell1em align="right">{g.Documento}</TableCell1em>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            // color="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};

export default BotonListarIntegrantesGrupo;
