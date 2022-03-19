import React from "react";
import { Alert, ListItem, ListItemText } from "@mui/material";

const MensajeFeedback = ({ tipo, children }) => {
  return (
    <ListItem key="0" sx={{ paddingX: "0" }}>
      <ListItemText>
        <Alert severity={tipo} sx={{ fontSize: "1rem" }}>
          {children}
        </Alert>
      </ListItemText>
    </ListItem>
  );
};

MensajeFeedback.defaultProps = {
  tipo: "info",
  children: "sdfsdf",
};

export default MensajeFeedback;
