import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";

const IconButtonNotiStack = ({ keySnackbar }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      sx={{ color: "#fff" }}
      onClick={() => closeSnackbar(keySnackbar)}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default IconButtonNotiStack;
