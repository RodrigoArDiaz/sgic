import { Icon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  CardMain,
  DividerExtremoTransp,
} from "./ComponentesPagina/ComponentesPagina";

const CardMainPage = ({ icon, title, bgColorIcon, children }) => {
  return (
    <CardMain sx={{ overflow: "visible" }}>
      <Box display="flex" justifyContent="start" pt={1} px={2} gap={2}>
        <Box
          variant="gradient"
          // bgColor="#000"
          sx={{ backgroundColor: bgColorIcon }}
          // color={color === "light" ? "dark" : "white"}
          color="white"
          // coloredShadow={color}
          boxShadow="rgb(99 99 99 / 20%) 0px 2px 8px 0px"
          borderRadius="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </Box>
        <Box textAlign="right" lineHeight={1.25}>
          <Typography
            // variant="button"
            // fontWeight="light"
            // color="text"
            variant="h5"
            // sx={{ fontWeight: "medium" }}
            // color="rgb(52, 71, 103)"
            paddingTop="0.25rem"
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <DividerExtremoTransp />
      {children}
    </CardMain>
  );
};

export default CardMainPage;
