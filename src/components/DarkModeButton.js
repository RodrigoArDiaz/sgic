import React, { useState } from "react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { amber, indigo, yellow } from "@mui/material/colors";

const colorIconDark = indigo[500];
const colorIconLight = amber[500];

const DarkModeButton = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const handleFullScreen = () => {
    setFullScreen(!fullScreen);
  };
  return (
    <IconButton
      size="small"
      sx={{
        color: "text.bodysecondary",
        // color: "secondary.main",
        // backgroundColor: "secondary.light50",
        // marginX: "1rem",
        borderRadius: "4px",
        backgroundColor: "icons.bg",
      }}
      onClick={handleFullScreen}
      disableTouchRipple
    >
      {fullScreen ? (
        <LightModeOutlinedIcon sx={{ fontSize: 24, color: "icons.main" }} />
      ) : (
        <DarkModeOutlinedIcon sx={{ fontSize: 24, color: "icons.main" }} />
      )}
    </IconButton>
  );
};

export default DarkModeButton;
