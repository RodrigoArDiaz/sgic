import React from "react";
import { useTheme } from "@emotion/react";
import { Dialog, useMediaQuery } from "@mui/material";

const DialogCustom = ({ children, ...props }) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullWidth
      fullScreen={esXs ? true : false}
      sx={{
        backdropFilter: "blur(0.8px)",
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
};

export default DialogCustom;
