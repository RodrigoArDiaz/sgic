import React from "react";
import { Alert, ListItem, ListItemText } from "@mui/material";

const MensajeFeedback = ({ tipo, children }) => {
  return (
    <ListItem key="0" sx={{ paddingX: "0" }}>
      <ListItemText>
        <Alert
          severity={tipo}
          sx={{
            fontSize: "1rem",
            border: "1px solid",
            borderColor: "info.light",
          }}
          // variant="outlined"
        >
          {children}
        </Alert>
      </ListItemText>
    </ListItem>
  );
};

MensajeFeedback.defaultProps = {
  tipo: "info",
  children: "",
};

export default MensajeFeedback;
