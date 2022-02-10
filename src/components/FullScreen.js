import React, { useState } from "react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const FullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const theme = useTheme();
  const arribaSm = useMediaQuery(theme.breakpoints.up("md"));
  const elem = document.documentElement;

  /* Abrir en fullscreen */
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  /* Cerrar fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  const handleFullScreen = () => {
    fullScreen ? closeFullscreen() : openFullscreen();
    setFullScreen((prevFullScreen) => !prevFullScreen);
  };

  return (
    <>
      {arribaSm && (
        <IconButton sx={{ color: "#fff" }} onClick={handleFullScreen}>
          {fullScreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      )}
    </>
  );
};

export default FullScreen;
