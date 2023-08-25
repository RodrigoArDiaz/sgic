import React from "react";
import { Grid } from "@mui/material";

const ContenedorFilasPorPagina = ({ children }) => {
  return (
    <Grid
      item
      xs={2}
      sx={{
        mt: 1,
        verticalAlign: "middle",
        color: "rgba(0, 0, 0, 0.80)",
        fontWeight: "500",
        fontSize: "0.875rem",
      }}
      textAlign="end"
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={1}
      paddingY={1}
    >
      {children}
    </Grid>
  );
};

export default ContenedorFilasPorPagina;
