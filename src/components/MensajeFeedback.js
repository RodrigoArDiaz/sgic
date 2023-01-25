import React from "react";
import { Alert, AlertTitle, ListItem, ListItemText } from "@mui/material";

const MensajeFeedback = ({ tipo, children, alertTitleVisible }) => {
  return (
    <ListItem key="0" sx={{ paddingX: "0", paddingY: "0" }}>
      <ListItemText>
        <Alert
          severity={tipo}
          sx={{
            // fontSize: "1rem",
            // border: "1px solid",
            // borderColor: "info.light",
            // color: "black",
            border: tipo == "info" ? "1px solid #03a9f4" : "1px solid #ef5350",
          }}
          // variant="outlined"
        >
          {alertTitleVisible && (
            <AlertTitle>
              {tipo == "info" && "Información"}
              {tipo == "error" && "Error"}
            </AlertTitle>
          )}
          {children}
        </Alert>
      </ListItemText>
    </ListItem>
  );
};

MensajeFeedback.defaultProps = {
  tipo: "info",
  children: "",
  alertTitleVisible: false,
};

export default MensajeFeedback;
