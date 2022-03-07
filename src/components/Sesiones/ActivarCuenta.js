import * as React from "react";
import { useParams } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function ActivarCuenta() {
  //  const [open, setOpen] = React.useState(props.abrir);

  const navegar = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [texto, setTexto] = React.useState("");
  const Activar = useParams();

  const handleClose = () => {
    setOpen(false);
    navegar("/iniciar_sesion_super");
  };

  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //'Authorization': 'Bearer '+localStorage.getItem('tkn')
      },
    });

    return response.json();
  }

  React.useEffect(() => {
    var data = {
      Codigo: Activar.codigoActivacion,
    };

    //console.log(Activar);

    consultas(data, "http://127.0.0.1:8000/api/activarcuenta")
      .then((response) => {
        //console.log(response);
        setOpen(true);
        if (response.Error === undefined) {
          setTexto(response.Mensaje);
          //navegar("/iniciar_sesion_super");
        } else {
          setTexto(response.Error);
        }
      })
      .catch((error) => {
        console.log("Error de conexión en useefect" + error);
        navegar("/registrarse");
      });
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="alert-dialog-title">{"Información"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {texto}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
