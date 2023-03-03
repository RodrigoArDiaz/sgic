import * as React from "react";
//MUI
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Tooltip, Zoom } from "@mui/material";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
//
import DialogCustom from "../../Material UI - Componentes Modificados/DialogCustom";

/*** Componente BotonAceptar ***/
export default function BotonAceptar(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Recargar enunciado" TransitionComponent={Zoom} arrow>
        <IconButton aria-label="enunciado1" onClick={handleClickOpen}>
          <CheckCircleOutlineOutlined color="secondary" />
        </IconButton>
      </Tooltip>

      <DialogCustom
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle display="flex" flexDirection="row">
          <CheckCircleOutlineOutlined
            sx={{ alignSelf: "center", marginRight: 1 }}
          />
          Recargar enunciado
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La operación borrará el enunciado anterior. ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.Operacion("1");
              handleClose();
            }}
            variant="contained"
          >
            Aceptar
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </div>
  );
}
