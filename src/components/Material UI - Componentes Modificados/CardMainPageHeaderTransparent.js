import React from "react";
import { Avatar, CardHeader, Icon, Typography } from "@mui/material";
import { Box } from "@mui/material";

import {
  CardMain,
  DividerExtremoTransp,
} from "./ComponentesPagina/ComponentesPagina";

const CardMainPageHeaderTransparent = ({
  icon,
  title,
  bgColorIcon,
  children,
  visibleIcon,
  visibleHeader,
  titleTextAlign,
  dividerVisible,
}) => {
  return (
    <CardMain
      sx={{
        overflow: "visible",
        // boxShadow:
        //   "rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px",
        boxShadow: (theme) => theme.customShadows.z1,
        border: "none",
        // height: "100%",
      }}
    >
      {/* {visibleHeader && (
        <>
          <Box display="flex" justifyContent="start" pt={1} px={2} gap={2}>
            {visibleIcon && (
              <Box
                variant="gradient"
                // bgColor="#000"
                // sx={{ backgroundColor: bgColorIcon }}
                // color={color === "light" ? "dark" : "white"}
                // color="palette.white.main"
                // coloredShadow={color}
                // boxShadow="rgb(99 99 99 / 20%) 0px 2px 8px 0px"
                // borderRadius="10px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                // width="3.5rem"
                // minWidth="3.5rem"
                // height="3.5rem"
                // mt={-2.5}
              >
                <Icon fontSize="medium">{icon}</Icon>
              </Box>
            )}

            <Box
              textAlign={titleTextAlign}
              lineHeight={1.25}
              sx={{ alignSelf: "center" }}
            >
              <Typography variant="h5" paddingTop="0.25rem">
                {title}
              </Typography>
            </Box>
          </Box>
        
        </>
      )} */}
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title="Shrimp and Chorizo Paella"
        // subheader="September 14, 2016"
        sx={{ background: "transparent" }}
      />

      {children}
    </CardMain>
  );
};

CardMainPageHeaderTransparent.defaultProps = {
  visibleIcon: true,
  visibleHeader: true,
  titleTextAlign: "right",
  dividerVisible: true,
};

export default CardMainPageHeaderTransparent;
