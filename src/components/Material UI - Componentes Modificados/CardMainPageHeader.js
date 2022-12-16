import React from "react";
import { Box, Icon, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

function CardMainPageHeader({ icon, title }) {
  return (
    <Box
      display="flex"
      justifyContent="start"
      p={2}
      gap={2}
      sx={{ paddingLeft: "0", paddingTop: "0" }}
    >
      <Box
        variant="gradient"
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.main,
          boxShadow: (theme) => theme.customShadows.z1,
        }}
        color="palette.secondary.main"
        // boxShadow="rgb(99 99 99 / 20%) 0px 2px 8px 0px"
        borderRadius="10px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minWidth="3rem"
        height="3rem"
        // mt={-2.5}
      >
        <Icon fontSize="medium" sx={{ color: "white.main" }}>
          {icon}
        </Icon>
      </Box>

      <Box textAlign="start" lineHeight={1.25} alignSelf="end">
        <Typography variant="h5" paddingTop="0.25rem" fontWeight="400">
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export default CardMainPageHeader;
