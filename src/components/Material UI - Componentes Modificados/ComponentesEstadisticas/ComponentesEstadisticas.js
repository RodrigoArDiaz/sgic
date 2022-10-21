import React from "react";
//MUI
import { Chip, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

/******************************
 *
 */
const ChipCustom = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <Chip {...props} ref={ref}>
      {props.children}
    </Chip>
  );
});

/******************************
 * Linear progress custom error
 * */
const BorderLinearProgressError = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.error.lightLow,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    // backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    backgroundColor: theme.palette.error.main,
  },
}));

/********************************
 * Linear progress custom success
 * */
const BorderLinearProgressSuccess = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.success.light,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.success.main,
  },
}));

/******************************
 * Linear progress custom error
 * */
const CircularProgressSuccessError = styled(CircularProgress)(({ theme }) => ({
  //Estilos aplicados si color = 'primary'
  [`&.${circularProgressClasses.colorPrimary}`]: {
    color: theme.palette.success.main,
  },

  //Estilos aplicados si color = 'secondary'
  [`&.${circularProgressClasses.colorSecondary}`]: {
    color: theme.palette.error.main,
  },
}));

// function LinearProgressWithLabel(props) {
//   return (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Box sx={{ width: "100%", mr: 1 }}>
//         {/* <LinearProgress variant="determinate" {...props} /> */}
//         {props.value < 100 ? (
//           <BorderLinearProgressError variant="determinate" {...props} />
//         ) : (
//           <BorderLinearProgressSuccess variant="determinate" {...props} />
//         )}
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" color="text.secondary">{`${Math.round(
//           props.value
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <CircularProgressSuccessError
        variant="determinate"
        {...props}
        size={70}
        value={props.value}
        color={props.value < 100 ? "secondary" : "primary"}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {props.value}%
        </Typography>
      </Box>
    </Box>
  );
}

export {
  ChipCustom,
  BorderLinearProgressError,
  BorderLinearProgressSuccess,
  CircularProgressSuccessError,
  CircularProgressWithLabel,
};
