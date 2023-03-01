import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export default function OutlinedCard(props) {
  return (
    <Alert
      variant="outlined"
      severity="info"
      // icon={<DragIndicatorIcon fontSize="inherit" />}
      icon={false}
      action={<DragIndicatorIcon color="info" />}
    >
      <Typography> {props.fila.Examen}</Typography>
    </Alert>
  );
}
