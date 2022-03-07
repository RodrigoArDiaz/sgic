import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackMensajes(props) {
  //  const [open, setOpen] = React.useState(props.abrir);

  const handleClose = (event, reason) => {
    //console.log("cerrando snack");
    props.cerrar(false);
    //setOpen(false);
  };

  //  console.log("Renderizando snack"+open);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.abrir}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={props.tipo}
          sx={{ width: "100%" }}
        >
          {props.mensaje}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
