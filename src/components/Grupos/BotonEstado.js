import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

export const BotonEstado = (props) => {
  const navegar = useNavigate();
  const [salto, setSalto] = React.useState(props.estado);

  function manejador() {
    var data = {
      pidG: props.idgrupo,
      pidCu: props.cursada.IdCursada,
    };

    if (salto === "A") {
      setSalto("C");
      Responses.consultas(data, "http://127.0.0.1:8000/api/bajagrupo")
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("B");
          } else if (Responses.status === 401) {
            navegar("/ingreso");
          } else {
            navegar("/error");
          }
        })
        .catch((error) => {
          navegar("/error");
        });

      //setSalto('B');
    } else {
      if (salto === "B") {
        setSalto("C");
        Responses.consultas(data, "http://127.0.0.1:8000/api/altagrupo")
          .then((response) => {
            if (Responses.status === 200) {
              setSalto("A");
            } else if (Responses.status === 401) {
              navegar("/ingreso");
            } else {
              navegar("/error");
            }
          })
          .catch((error) => {
            navegar("/error");
          });
      }
    }
  }

  return (
    <>
      {salto === "A" && (
        <Grid item xs={12} sm="auto">
          {/* <Tooltip title="Activo" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                aria-label="estado"
                size="small"
                color="success"
                onClick={() => manejador()}
              >
                <CheckIcon />
              </IconButton>
            </span>
          </Tooltip> */}
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
          {/* <Tooltip title="Baja" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                aria-label="estado2"
                size="small"
                color="error"
                onClick={() => manejador()}
              >
                <CloseIcon />
              </IconButton>
            </span>
          </Tooltip> */}
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
