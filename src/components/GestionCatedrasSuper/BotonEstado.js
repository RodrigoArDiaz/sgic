import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import { Chip } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
//React router dom
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BotonEstado ***/
export const BotonEstado = (props) => {
  //Recupero token
  const token = localStorage.getItem("tkn");

  const navegar = useNavigate();
  const [salto, setSalto] = React.useState(props.estado);

  async function consultas(data, cadena) {
    //Adjunto token
    data = { ...data, ...{ token: token } };

    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  }

  function manejador() {
    var data = {
      IdCatedra: props.idcatedra,
    };

    if (salto === "A") {
      setSalto("C");
      consultas(data, endpoints.bajaCatedra)
        .then((response) => {
          if (response.Error === undefined) {
            setSalto("B");
          } else {
          }
        })
        .catch((error) => {
          navegar(routes.registro);
        });
    } else {
      if (salto === "B") {
        setSalto("C");
        consultas(data, endpoints.altaCatedra)
          .then((response) => {
            if (response.Error === undefined) {
              setSalto("A");
            } else {
            }
          })
          .catch((error) => {
            navegar(routes.registro);
          });
      }
    }
  }

  return (
    <>
      {salto === "A" && (
        <Grid item xs={12} sm="auto">
          <Chip
            variant="outlined"
            color="success"
            label="Alta"
            icon={<CheckCircleOutlineOutlined />}
            onClick={() => manejador()}
          />
        </Grid>
      )}
      {salto === "B" && (
        <Grid item xs={12} sm="auto">
          <Chip
            variant="outlined"
            color="error"
            label="Baja"
            icon={<HighlightOffOutlinedIcon />}
            onClick={() => manejador()}
          />
        </Grid>
      )}
      {salto === "C" && (
        <Grid item xs={12} sm="auto">
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
        </Grid>
      )}
    </>
  );
};
