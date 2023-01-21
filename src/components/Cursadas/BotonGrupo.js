import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import { CheckOutlined } from "@mui/icons-material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

export const BotonGrupo = (props) => {
  const [salto, setSalto] = React.useState(props.grupos);

  return (
    <>
      {salto === "S" && (
        <Grid item xs={12} sm="auto">
          {/* <Tooltip title="Permitido" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton aria-label="estado" size="small" color="success">
                <CheckCircleOutlineOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip> */}
          <Chip
            variant="outlined"
            color="success"
            label="Admite"
            // icon={<CheckIcon />}
          />
        </Grid>
      )}
      {salto === "N" && (
        <Grid item xs={12} sm="auto">
          {/* <Tooltip title="No permitido" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton aria-label="estado2" size="small" color="error">
                <CloseIcon />
              </IconButton>
            </span>
          </Tooltip> */}
          <Chip
            variant="outlined"
            color="error"
            label="No admite"
            // icon={<CloseIcon />}
          />
        </Grid>
      )}
    </>
  );
};
