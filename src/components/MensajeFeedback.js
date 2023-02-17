import React from "react";
import { Alert, AlertTitle, ListItem, ListItemText } from "@mui/material";

const determinarBorder = (tipo) => {
  switch (tipo) {
    case "info":
      return "1px solid #03a9f4";

    case "error":
      return "1px solid #ef5350";

    case "success":
      return "1px solid rgb(76, 175, 80)";

    default:
      break;
  }
};

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
            border: determinarBorder(tipo),
            "& .MuiAlert-message": { fontSize: "1rem" },
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
