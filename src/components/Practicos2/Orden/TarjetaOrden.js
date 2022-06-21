import * as React from "react";
import { Alert, IconButton, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
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
      <Typography>{props.fila.Practico}</Typography>
    </Alert>
  );
}
