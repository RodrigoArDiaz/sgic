import React from "react";
import { useTheme } from "@emotion/react";
import { IconButton, SvgIcon } from "@mui/material";

const Logo = ({ fontSize }) => {
  const theme = useTheme();
  return (
    <IconButton size="large" disableRipple>
      <SvgIcon
        color="secondary"
        fontSize="large"
        sx={{
          fontSize: { fontSize },
        }}
      >
        {/* Logo4 *************************************************/}
        <path
          d="M15.27407,3.27273h-0.00114V3.27216l-1.09032-1.09034h-0.00056V2.18124l-1.09031-1.09033
	h-0.00057V1.09034L12.00085,0h-0.00114L10.9094,1.09034v0.00057h-0.00056L9.81851,2.18124v0.00057H9.81794L8.72763,3.27216v0.00057
	H8.72706L7.63675,4.36307v0.00057h0.00057l1.09031,1.09034v0.00057H8.7282l1.09032,1.09034v0.00057h0.00057l1.09031,1.09033v0.00057
	h0.00057l1.09031,1.09034l1.09032-1.09034h0.00057V7.63579l1.09031-1.09033h0.00057V6.54489l1.09031-1.09034h0.00057V5.45397
	h0.00057l1.09031-1.09034h0.00057V4.36307L15.27407,3.27273z
 M14.18205,4.36364h-0.00057l-1.09031,1.09034v0.00057H13.0906
	l-1.09032,1.09034l-1.09031-1.09034H10.9094V5.45397L9.81909,4.36364H9.81851V4.36307l1.09032-1.09034h0.00056V3.27216
	l1.09031-1.09034h0.00114l1.09032,1.09034v0.00057h0.00057l1.09031,1.09034V4.36364z"
          fill={theme.palette.primary.dark}
        />

        <path
          d="M18.54616,8.72728v0.00057l-1.09089,1.09091
	l-1.09088,1.09091l-1.09088,1.09091h-0.00057l-1.09088,1.09033v0.00057l-1.09088,1.09091l-1.09089,1.09091l-2.18176-2.18182
	v-0.00057L8.7282,12.00058H8.72706l-1.09031-1.09091L6.54586,9.81876H6.54529L5.45442,8.72785V8.7267l1.0903-1.09034h0.00172
	L6.54586,7.63579l1.09032-1.09033h0.00114l1.09031,1.09033v0.00057H8.72706L7.63675,8.7267v0.00114l2.18176,2.18182l1.09032,1.09091
	h0.00114l1.09031,1.09033l1.09032-1.09033h0.00114l1.09031-1.09091l1.09088-1.09091h0.00057l1.09088-1.09091V8.7267
	l-1.09031-1.09034L15.2735,7.63579l1.09031-1.09033h0.00114l1.09031,1.09033v0.00057L18.54616,8.72728z"
          fill={theme.palette.primary.main}
        />

        <path
          d="M22.90968,10.90966
	l-1.09089-1.09091l-1.09088-1.09091l-2.18176,2.18182l-1.09089,1.09091h-0.00057l-1.09031,1.09033v0.00057l-1.09088,1.09091
	h-0.00057l-1.09088,1.09091l-1.09088,1.09091H13.0906l-1.09032,1.09034l-1.09031-1.09034h-0.00114L9.81851,15.2733l-1.09088-1.09091
	l-1.09088-1.09091v-0.00057l-1.09089-1.09033H6.54529v-0.00057l-1.09087-1.09034L4.36353,9.81876L3.27265,8.72785l-2.18177,2.18182
	L0,12.00001v0.00057l1.09087,1.09033v0.00057l3.27265,3.27273H4.3641l1.09032,1.09034v0.00057l1.09087,1.09033v0.00057h0.00057
	l1.09089,1.09034v0.00057h0.00057l1.09031,1.09034v0.00057H8.7282l1.09032,1.09034v0.00057h0.00057l1.09031,1.09034l0.00114,0.00114
	L12.00028,24l2.1812-2.18124h0.00057v-0.00057l1.09031-1.09034h0.00057v-0.00057h0.00057l1.09031-1.09034h0.00057v-0.00057
	l1.09031-1.09034h0.00057l1.09089-1.0909l1.09087-1.09091h0.00057l1.09032-1.09091l1.09088-1.09091l1.09089-1.09091v-0.00057
	L24,12.00058L22.90968,10.90966z 
M20.72792,13.09091v0.00057l-1.09089,1.09091l-1.09087,1.09091l-1.09089,1.09091h-0.00057
	l-1.09031,1.09034v0.00057l-1.09088,1.0909h-0.00057l-1.09088,1.09034v0.00057h-0.00057l-1.09031,1.09034v0.00057H13.0906
	l-1.09032,1.09034l-1.09031-1.09034H10.9094v-0.00057l-1.09031-1.09034H9.81851v-0.00057L8.7282,18.54603H8.72706l-1.09031-1.0909
	v-0.00057l-1.09089-1.09034H6.54529v-0.00057L5.45442,15.2733l-2.18177-2.18182l-1.09088-1.0909l1.09088-1.09091l1.09088,1.09091
	H4.3641l1.09032,1.09033v0.00057l1.09087,1.09091h0.00057l1.09089,1.09091l1.09031,1.09091H8.7282l1.09032,1.09034v0.00057
	l1.09032,1.0909h0.00114l1.09031,1.09034l1.09032-1.09034h0.00114l1.09031-1.0909v-0.00057l1.09088-1.09034h0.00057l4.36353-4.36363
	h0.00057l1.09032-1.09091l1.09032,1.09091L20.72792,13.09091z"
          fill={theme.palette.primary.light}
        />
      </SvgIcon>
    </IconButton>
  );
};

Logo.defaultProps = {
  fontSize: 38,
};

export default Logo;
