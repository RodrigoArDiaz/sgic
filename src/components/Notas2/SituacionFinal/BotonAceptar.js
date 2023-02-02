import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function BotonAceptar(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  console.log("valor" + props.valor);
  return (
    <div>
      <Dialog
        open={open}
        //        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El alumno no cumple requisitos mínimos de aprobación. ¿Desea asignar
            la nota?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              props.Operacion();
            }}
          >
            Aceptar
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.Borrar("");
              props.Saltar("1");
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
