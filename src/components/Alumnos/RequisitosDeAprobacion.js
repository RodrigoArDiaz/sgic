import { Box, CardHeader, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React from "react";

const RequisitosDeAprobacion = () => {
  return (
    <Box
      display="flex"
      p={1.5}
      // pt={0}
      gap={3}
      justifyContent="end"
    >
      <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
        Requisito de aprobación:
      </Typography>
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box
          sx={{
            width: "20px",
            height: "6px",
            borderRadius: "20px",
            bgcolor: green[900],
          }}
          component="span"
        ></Box>
        <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
          Cumple
        </Typography>
      </Box>
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box
          sx={{
            width: "20px",
            height: "6px",
            borderRadius: "20px",
            bgcolor: red["A700"],
          }}
          component="span"
        ></Box>
        <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
          No cumple
        </Typography>
      </Box>
    </Box>
  );
};

export default RequisitosDeAprobacion;
