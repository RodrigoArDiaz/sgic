import React from "react";
import { useTheme } from "@emotion/react";
//MUI
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import {
  Avatar,
  Divider,
  Grid,
  Popover,
  Typography,
  useMediaQuery,
  Button,
  Zoom,
  Fade,
} from "@mui/material";
import { blue, indigo, orange } from "@mui/material/colors";
//Redux
import { useSelector } from "react-redux";
//React router dom
import { useNavigate } from "react-router-dom";
//Componentes propios
import CerrarSesion from "../CerrarSesion";

const MenuUsuarioDesplegable = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const theme = useTheme();
  const mostrarResponsive = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        //  backgroundColor: "secondary.light50",
        borderRadius: "10px",
      }}
    >
      {mostrarResponsive ? (
        <IconButton
          aria-describedby={id}
          aria-label="Menú"
          sx={{ backgroundColor: "#fff", color: "inherit" }}
          // sx={{ color: "inherit" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
      ) : (
        <Button
          size="medium"
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            color: "text.titleprimary",
            borderColor: "text.bodysecondary",
          }}
          // variant="outlined"
          startIcon={
            <AccountCircleIcon sx={{ fontSize: 30, color: blue[500] }} />
          }
          endIcon={
            <KeyboardArrowDownIcon
              sx={{
                transform: open ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s",
                fontSize: 30,
              }}
            />
          }
          aria-describedby={id}
          onClick={handleClick}
        >
          {user.Usuario}
        </Button>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        // TransitionComponent={Zoom}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
      >
        <Grid container justifyContent="center" marginTop={2}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: blue[500],
            }}
          >
            {user.Apellidos &&
              user.Nombres &&
              user.Apellidos.toString().charAt(0) +
                "" +
                user.Nombres.toString().charAt(0)}
          </Avatar>
        </Grid>

        <Typography gutterBottom variant="h5" component="div" align="center">
          {user.Apellidos + " " + user.Nombres}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
        ></Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {user.Email}
        </Typography>

        <Divider variant="middle" />

        <Grid
          container
          justifyContent="center"
          align="center"
          marginBottom={2}
          marginTop={1}
          spacing={1}
        >
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              startIcon={<PersonIcon />}
              onClick={() => {
                navigate("mi_perfil");
                handleClose();
              }}
            >
              Mi perfil
            </Button>
          </Grid>

          <Grid item xs={12}>
            <CerrarSesion handleCloseMenu={handleClose} />
          </Grid>
        </Grid>
      </Popover>
    </Box>
  );
};

export default MenuUsuarioDesplegable;
