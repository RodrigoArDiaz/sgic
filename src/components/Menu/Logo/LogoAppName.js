import { Typography } from "@mui/material";
import React from "react";

const LogoAppName = (fontSize) => {
  return (
    <Typography
      // variant="h5"
      fontFamily="Public Sans, sans-serif"
      sx={{
        fontWeight: "500",
        lineHeight: "1.27",
        fontSize: "1.6rem",
        // letterSpacing: "1px",
      }}
    >
      SGIC
    </Typography>
  );
};

// LogoAppName.defaultProps = {
//   fontSize: "1.6rem",
// };

export default LogoAppName;
