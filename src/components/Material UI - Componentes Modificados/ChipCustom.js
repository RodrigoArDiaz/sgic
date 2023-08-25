import React from "react";
import { Chip } from "@mui/material";

export const ChipCustom = ({ ...props }) => {
  return (
    <Chip
      {...props}
      //   color="secondary"
      //   variant="outlined"
      sx={{
        "& .MuiChip-label": {
          fontSize: "1.13em",
        },
      }}
    />
  );
};
