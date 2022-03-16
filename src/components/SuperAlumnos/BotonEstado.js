import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
import { Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

//React router dom
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";

export const BotonEstado = (props) => {
  const navegar = useNavigate();
  const [salto, setSalto] = React.useState(props.estado);

  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  }

  function manejador() {
    var data = {
      pidUs: props.estado,
    };

    if (salto === "A") {
      setSalto("C");
      consultas(data, "http://127.0.0.1:8000/api/bajaalumno")
        .then((response) => {
          if (response.Error === undefined) {
            setSalto("B");
          } else {
            console.log(response.Error);
          }
        })
        .catch((error) => {
          console.log("Error de conexión" + error);
          navegar("/registrarse");
        });

      //setSalto('B');
    } else {
      if (salto === "B") {
        setSalto("C");
        consultas(data, "http://127.0.0.1:8000/api/altaalumno")
          .then((response) => {
            if (response.Error === undefined) {
              setSalto("A");
            } else {
              console.log(response.Error);
            }
          })
          .catch((error) => {
            console.log("Error de conexión" + error);
            navegar("/registrarse");
          });

        //  setSalto('A');
      }
    }
  }

  return (
    <>
      {salto === "A" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Activo" TransitionComponent={Zoom}>
            <span>
              <IconButton
                aria-label="estado"
                size="large"
                color="success"
                onClick={() => manejador()}
              >
                <CheckCircleOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      )}
      {salto === "B" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Baja" TransitionComponent={Zoom}>
            <span>
              <IconButton
                aria-label="estado2"
                size="large"
                color="error"
                onClick={() => manejador()}
              >
                <CancelOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      )}
      {salto === "C" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Verificando" TransitionComponent={Zoom}>
            <span>
              <IconButton
                aria-label="estado3"
                size="large"
                color="inherit"
                onClick={() => manejador()}
              >
                <CircularProgress size={21} />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      )}
    </>
  );
};
