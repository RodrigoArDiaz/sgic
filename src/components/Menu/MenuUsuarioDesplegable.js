import React from "react";

//MUI
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Avatar,
  Divider,
  Popover,
  Typography,
  useMediaQuery,
  Button,
  Fade,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";

//Redux
import { useSelector } from "react-redux";
//React router dom
import { useNavigate } from "react-router-dom";
//Componentes propios
import CerrarSesion from "../CerrarSesion";

/**Componente Popover custom*/
const PopoverCustomMenu = styled(Popover)(({ theme }) => ({
  "& .MuiPopover-paper": {
    boxShadow: theme.customShadows.z3,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.secondary.light100,
    // boxShadow: "none",
  },
}));

/**Componente CarContent custom*/
const CardContentCustom = styled(CardContent)(({ theme }) => ({
  "&:last-child": { paddingBottom: "0" },
}));

/*************************************
 * Componente
 */
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
    <>
      {mostrarResponsive ? (
        <IconButton
          aria-describedby={id}
          aria-label="Menú"
          sx={{ backgroundColor: "#fff", color: "inherit" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          size="medium"
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            color: "text.titleprimary",
            // borderColor: "text.bodysecondary",
            borderColor: "secondary.main",
            // borderColor:'primary.main',
            textTransform: "lowercase",
            borderWidth: "0",
            "&:hover": {
              borderWidth: "0",
            },
            backgroundColor: "icons.bg",
          }}
          startIcon={
            <AccountCircleOutlinedIcon
              sx={{ fontSize: 60, color: "icons.main" }}
            />
          }
          endIcon={
            <KeyboardArrowDownIcon
              sx={{
                color: "icons.main",
                transform: open ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s",
                fontSize: 30,
              }}
            />
          }
          aria-describedby={id}
          onClick={handleClick}
        >
          {user.Usuario ? user.Usuario : "johnsmith"}
        </Button>
      )}

      <PopoverCustomMenu
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
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        paddingX={0}
        xs
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: blue[500],
              }}
              aria-label="recipe"
            >
              {user.Apellidos &&
                user.Nombres &&
                user.Apellidos.toString().charAt(0) +
                  "" +
                  user.Nombres.toString().charAt(0)}
            </Avatar>
          }
          title={
            <Typography
              gutterBottom
              variant="subtitle2"
              sx={{ fontSize: "1.1rem", mb: "0" }}
              padding={0}
            >
              {user.Apellidos && user.Nombres
                ? user.Apellidos + " " + user.Nombres
                : "John Doe Smith"}
            </Typography>
          }
          subheader={
            <Typography
              variant="body2"
              color="text.secondary"
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <MailOutlineIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                fontSize="small"
              />
              {user.Email ? user.Email : "userejemplo@gmail.com"}
            </Typography>
          }
        />

        <CardContentCustom
          sx={{ paddingTop: "0", paddingBottom: "0px" }}
          paddingBottom={0}
        >
          <List sx={{ paddingTop: "0" }}>
            <Divider variant="middle" sx={{ marginX: "0" }} />
            <ListItem
              disablePadding
              onClick={() => {
                navigate("mi_perfil");
                handleClose();
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon sx={{ color: "icons.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="p">Mi perfil</Typography>}
                />
              </ListItemButton>
            </ListItem>

            <Divider variant="middle" sx={{ marginX: "0" }} />

            <ListItem disablePadding>
              <CerrarSesion handleCloseMenu={handleClose} />
            </ListItem>
          </List>
        </CardContentCustom>
      </PopoverCustomMenu>
    </>
  );
};

export default MenuUsuarioDesplegable;
