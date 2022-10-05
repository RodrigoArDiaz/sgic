import React, { useState } from "react";
//Estilos
import "./Menu.css";
//MUI
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ApiIcon from "@mui/icons-material/Api";
import {
  Collapse,
  Fade,
  Icon,
  ListItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { Drawer as DrawerResponsive } from "@mui/material";
import { Zoom } from "@mui/material";
//React router dom
import { Outlet, NavLink } from "react-router-dom";
//MUI personalizados
import {
  DrawerHeader,
  AppBar,
  Drawer,
  drawerWidth,
  ButtonMenu,
  ListMenu,
  ListItemMenu,
  TypographyTitulo,
} from "../Material UI - Componentes Modificados/ComponenteMenu/ComponentesMenu";
//Componentes propiios
import MenuUsuarioDesplegable from "./MenuUsuarioDesplegable.js";
import FullScreen from "../FullScreen";
import { useDispatch, useSelector } from "react-redux";

//Redux - Menu
// import { actualizarMenu, menuReset } from "../../store/slices/menuSlice";
import { ExpandMore } from "@mui/icons-material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { useTheme } from "@emotion/react";
import DarkModeButton from "../DarkModeButton";

/***** Componente Menu *****/
export default function Menu() {
  //Manejo del menu lateral (abrir y cerrar)
  const [open, setOpen] = React.useState(false);

  //Manejo de sublistas
  const [openSubList, setOpenSubList] = useState({});
  const handleSubList = (id) => {
    setOpenSubList((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    console.log(id);
  };

  //Manejo del titulo e items del menu
  const { listaItems, titulo } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  //Manejo de apertura del menu
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  //Para aplicar estilos especiales
  const theme = useTheme();
  const screenMenorMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    /*******************************************
    Navbar   
    *******************************************/
    <Box sx={{ display: "flex" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        open={open}
        // color="primary"
        sx={{
          // paddingLeft: "5.5px",
          backgroundColor: "transparent",
          boxShadow: "none",
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            color="tertiary"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={
              {
                // marginRight: "36px",
              }
            }
          >
            {open ? (
              <MenuOpenIcon sx={{ fontSize: 32 }} color="primary" />
            ) : (
              <MenuIcon sx={{ fontSize: 32 }} color="primary" />
            )}
          </IconButton>
          <TypographyTitulo
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: "1",
              paddingX: { xs: 0, sm: 3 },
            }}
          >
            {titulo}
          </TypographyTitulo>
          <DarkModeButton />
          <FullScreen />
          <MenuUsuarioDesplegable />
        </Toolbar>
      </AppBar>

      {/*******************************************
       Menu lateral screen >= md (para dispositivos desktop)    
       *******************************************/}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          backgroundColor: "#fff",
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            borderRadius: "0 13px 13px 0",
            backgroundColor: "#fff",
          },
        }}
      >
        <DrawerHeader
          sx={
            open ? { justifyContent: "center" } : { justifyContent: "center" }
          }
        >
          <IconButton>
            <ApiIcon
              sx={{
                fontSize: 38,
              }}
            />
          </IconButton>
        </DrawerHeader>

        <ListMenu>
          {/*Link de React-Dom*/}
          {listaItems.map((ele, index) => {
            //Para items ordinario (no son sublist)
            if (!Boolean(ele.esSublist)) {
              return (
                <Tooltip
                  title={ele.itemText}
                  placement="right"
                  TransitionComponent={Zoom}
                  key={ele.key}
                  arrow
                >
                  <ListItemMenu
                    button
                    key={ele.key}
                    sx={{ paddingLeft: 3.1 }}
                    component={NavLink}
                    to={ele.to}
                    className={(navData) => (navData.isActive ? "active" : "")}
                  >
                    <ListItemIcon>
                      <Icon baseClassName="material-icons-outlined">
                        {ele.icono}
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={ele.itemText}
                      sx={{ color: "text.titleprimary" }}
                    />
                  </ListItemMenu>
                </Tooltip>
              );
            } else {
              //Para items que son sublistas
              return (
                <>
                  <Box component="div" key={ele.key}>
                    {/* Titulo de sublista */}
                    {/* <Fade in={open}>Hola</Fade> */}
                    <ListItem
                      key={ele.key}
                      sx={{
                        paddingLeft: 3.1,
                        paddingBottom: 0,

                        height: open ? "auto" : "0px",
                        minHeight: "0px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          opacity: open ? "100%" : "0",
                          height: "0",
                          transition: "all 0.15s ease 0s",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                        marginTop={1.5}
                      >
                        {ele.itemText.toUpperCase()}
                      </Typography>
                    </ListItem>
                    {/* Sublista */}
                    <ListMenu
                      sx={{
                        transition:
                          "padding-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                        ...(open && {
                          paddingLeft: 2.2,
                        }),
                      }}
                    >
                      <Divider
                        sx={{
                          paddingTop: "0",
                          // opacity: !open ? "100%" : "0",
                          // transition: "all 0.15s ease 0s",
                        }}
                      />
                      {ele.sublist.map((itemSubList, index) => {
                        return (
                          <Tooltip
                            title={itemSubList.itemText}
                            placement="right"
                            TransitionComponent={Zoom}
                            key={itemSubList.key}
                            arrow
                          >
                            <ListItemMenu
                              button
                              key={itemSubList.key}
                              sx={{ paddingLeft: 2 }}
                              component={NavLink}
                              to={itemSubList.to}
                              className={(navData) =>
                                navData.isActive ? "active" : ""
                              }
                            >
                              <ListItemIcon
                              // sx={{
                              //   "& .MuiListItemIcon-root": {
                              //     color: "rgba(0, 0, 0, 0.70)",
                              //   },
                              // }}
                              >
                                <Icon
                                  baseClassName="material-icons-outlined"
                                  sx={{
                                    // color: "rgba(0, 0, 0, 0.70)",
                                    color: "rgba(58, 53, 65, 0.87)",
                                    fontSize: "1.45rem",
                                  }}
                                  // fontSize="small"
                                >
                                  {itemSubList.icono}
                                </Icon>
                              </ListItemIcon>
                              <ListItemText
                                primary={itemSubList.itemText}
                                sx={{
                                  // display: open ? "inline" : "none",
                                  opacity: open ? "100%" : "0",
                                  transition: "all 0.15s ease 0s",
                                  marginTop: "0",
                                  marginBottom: "0",
                                }}
                              />
                            </ListItemMenu>
                          </Tooltip>
                        );
                      })}
                    </ListMenu>
                    {/* <Divider /> */}
                    {/* </Collapse> */}
                  </Box>
                </>
              );
            }
          })}
        </ListMenu>
      </Drawer>

      {/*******************************************
       Menu lateral screen < md (para dispositivos MOVILES)    
       *******************************************/}
      <DrawerResponsive
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRadius: "0 13px 13px 0",
          },
        }}
      >
        <DrawerHeader>
          <ButtonMenu disableRipple onClick={handleDrawerToggle}>
            <CloseIcon />
          </ButtonMenu>
        </DrawerHeader>
        {/* <Divider /> */}
        <ListMenu>
          {listaItems.map((ele, index) => {
            //Es un item ordinario (no es sublist)
            if (!Boolean(ele.esSublist)) {
              return (
                <ListItemMenu
                  button
                  key={ele.key}
                  sx={{ paddingLeft: 3.1 }}
                  component={NavLink}
                  to={ele.to}
                  className={(navData) => (navData.isActive ? "active" : "")}
                  onClick={handleDrawerToggle}
                >
                  <ListItemIcon
                    sx={{
                      "& .MuiListItemIcon-root": {
                        color: "rgba(0, 0, 0, 0.70)",
                      },
                    }}
                  >
                    <Icon
                      sx={{
                        // color: "rgba(0, 0, 0, 0.70)",
                        color: "rgba(58, 53, 65, 0.87)",
                      }}
                    >
                      {ele.icono}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={ele.itemText} />
                </ListItemMenu>
              );
            } else {
              //Es una sublist
              return (
                <Box component="div" key={ele.key}>
                  {/* Titulo de sublista */}
                  <ListItem
                    key={ele.key}
                    sx={{
                      paddingLeft: 3.1,
                      paddingBottom: 0,
                      height: open ? "auto" : "0px",
                      minHeight: "0px",
                      "& .MuiButtonBase-root": {
                        height: "0px",
                        minHeight: "0px",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        opacity: open ? "100%" : "0",
                        height: "0",
                        transition: "all 0.15s ease 0s",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {ele.itemText.toUpperCase()}
                    </Typography>
                  </ListItem>

                  {/* Sublista */}
                  {/* <Collapse in={openSubList[index]}> */}
                  <ListMenu>
                    {/* <Divider /> */}
                    {ele.sublist.map((itemSubList, index) => {
                      return (
                        <Tooltip
                          title={itemSubList.itemText}
                          placement="right"
                          TransitionComponent={Zoom}
                          key={itemSubList.key}
                          arrow
                        >
                          <ListItemMenu
                            button
                            key={itemSubList.key}
                            sx={{ paddingLeft: 2.6 }}
                            component={NavLink}
                            to={itemSubList.to}
                            className={(navData) =>
                              navData.isActive ? "active" : ""
                            }
                            onClick={handleDrawerToggle}
                          >
                            <ListItemIcon color="rgba(0, 0, 0, 0.70)">
                              <Icon fontSize="small">{itemSubList.icono}</Icon>
                            </ListItemIcon>
                            <ListItemText
                              sx={{
                                // display: open ? "inline" : "none",
                                opacity: open ? "100%" : "0",
                                transition: "all 0.15s ease 0s",
                                marginTop: "0",
                                marginBottom: "0",
                              }}
                              primary={itemSubList.itemText}
                            />
                          </ListItemMenu>
                        </Tooltip>
                      );
                    })}
                  </ListMenu>
                  {/* <Divider /> */}
                  {/* </Collapse> */}
                </Box>
              );
            }
          })}
        </ListMenu>
      </DrawerResponsive>

      {/*******************************************
       Main: aqui van los componentes paginas, que 
       se renderizan con los componentes NavLink de
       react router dom   
       *******************************************/}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingX: { xs: 0, sm: 3 },
          paddingY: { xs: 2, sm: 1 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/*** Pagina ************/}
        <Outlet />
        {/*** Pagina ************/}
      </Box>
    </Box>
  );
}
