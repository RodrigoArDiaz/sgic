import { Box, Grid } from "@mui/material";
import React from "react";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";

const SpinnerMoonLoaderMedium = () => {
  return (
    <Grid container paddingTop={2}>
      <Grid item xs={12}>
        <Box component="div" display="flex" justifyContent="center">
          <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SpinnerMoonLoaderMedium;
