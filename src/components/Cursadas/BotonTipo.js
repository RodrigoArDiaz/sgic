import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import LayersIcon from "@mui/icons-material/Layers";
import HdrAutoOutlinedIcon from "@mui/icons-material/HdrAutoOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";

export const BotonTipo = (props) => {
  const [salto, setSalto] = React.useState(props.tipo);

  return (
    <>
      {salto === "P" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Promediable" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="estado" size="small" color="success">
              <LayersOutlinedIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {salto === "A" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Acumulable" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="estado2" size="small" color="success">
              <HdrAutoOutlinedIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </>
  );
};
