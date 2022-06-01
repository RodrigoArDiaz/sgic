import { Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Icon from "@mui/material/Icon";

const Card2 = () => {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between" pt={1} px={2}>
        <Box
          variant="gradient"
          bgColor="#000"
          // color="#fff"
          //   coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {/* {icon} */}store
          </Icon>
        </Box>
        <Box textAlign="right" lineHeight={1.25}>
          <Typography variant="button" fontWeight="light" color="text">
            {/* {title} */}
          </Typography>
          <Typography variant="h4">{/* {count} */}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box pb={2} px={2}>
        <Typography component="p" variant="button" color="text" display="flex">
          <Typography
            component="span"
            variant="button"
            fontWeight="bold"
            // color={percentage.color}
          >
            {/* {percentage.amount} */}
          </Typography>
          {/* &nbsp;{percentage.label} */}
        </Typography>
      </Box>
    </Card>
  );
};

export default Card2;
