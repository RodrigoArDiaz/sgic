import { React, useState } from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BotonEstado ***/
export const BotonEstado = (props) => {
  const navegar = useNavigate();
  const [salto, setSalto] = useState(props.estado);

  function manejador() {
    var data = {
      pidG: props.idgrupo,
      pidCu: props.cursada.IdCursada,
    };

    if (salto === "A") {
      setSalto("C");
      Responses.consultas(data, endpoints.bajaGrupo)
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("B");
          } else if (Responses.status === 401) {
            navegar(routes.iniciarSesion);
          } else {
            navegar(routes.error);
          }
        })
        .catch((error) => {
          navegar(routes.error);
        });

      //setSalto('B');
    } else {
      if (salto === "B") {
        setSalto("C");
        Responses.consultas(data, endpoints.altaGrupo)
          .then((response) => {
            if (Responses.status === 200) {
              setSalto("A");
            } else if (Responses.status === 401) {
              navegar(routes.iniciarSesion);
            } else {
              navegar(routes.error);
            }
          })
          .catch((error) => {
            navegar(routes.error);
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
          <Tooltip title="Verificando" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                aria-label="estado3"
                size="small"
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
