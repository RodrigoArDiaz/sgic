import React, { Children } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const DialogFullCustom = ({
  children,
  open,
  onClose,
  title,
  subtitle,
  icon,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullScreen>
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "#fff",
          boxShadow: "none",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid",
          borderColor: "borders.main",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            size="medium"
            color="tertiary"
            aria-label="open drawer"
            edge="center"
            sx={{
              // marginRight: "36px",
              color: "text.bodysecondary",
              borderRadius: "4px",
              backgroundColor: "icons.bg",
            }}
            disableRipple
          >
            <Icon
              sx={{ fontSize: 24, color: "icons.main" }}
              baseClassName="material-icons-outlined"
            >
              {icon}
            </Icon>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            startIcon={<CloseOutlinedIcon />}
          >
            Cerrar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ bgcolor: "background.default" }}>
        <Box paddingBottom={2}>
          <Typography variant="h5">{subtitle}</Typography>
        </Box>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogFullCustom;
