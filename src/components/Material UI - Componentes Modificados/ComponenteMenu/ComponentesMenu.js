import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { IconButton, List, ListItem } from "@mui/material";
import { teal } from "@mui/material/colors";

export const drawerWidth = 290;

/**************************************************
 * Estilos para la apertura del drawer
 */
export const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

/**************************************************
 * Estilos para el cierre del drawer
 */
export const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,

  //Ancho del menu minimmizado
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10.5)} + 1px)`,
  },
  //Esconder drawer en mobile
  [theme.breakpoints.down("md")]: {
    width: `0px`,
  },
});

//********* */
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//********* */
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1, // +1 si se quiere que la barra de menu este por encima
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),

  //agregados
  background: theme.palette.primary.main400,
  boxShadow: "-9px 1px 10px 2px rgb(0 0 0 / 12%)",
}));

//********* Setea la propiedad open de MuiDrawer*/
export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  // marginX: "10px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),

  "& .MuiPaper-root": {
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    borderRight: "0px",
  },
}));

/*******************************************
 * Componente personalizado del boton de menu
 */
export const ButtonMenu = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: "rgba(0, 0, 0, 0.04)",
  borderRadius: "10px",
  // border: `1px solid ${theme.palette.primary.light50}`,
  border: `1px solid ${teal[300]}`,
  "&:hover": {
    // boxShadow:
    //   "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
  },
}));

/*******************************************
 * Componente personalizado List para menu
 */
export const ListMenu = styled(List)(({ theme }) => ({
  padding: "0.4rem",
}));

/*******************************************
 * Componente personalizado ListItem para menu
 */
export const ListItemMenu = styled(ListItem)(({ theme }) => ({
  boxSizing: "border-box",
  backgroundColor: "rgba(0, 0, 0, 0.04)",
  borderRadius: "10px",
  marginTop: "0.5rem",
  border: "1px solid rgba(0, 0, 0, 0)",
  // border: "1px solid rgba(0, 0, 0, 0.12)",
  // border: `1px solid ${theme.palette.primary.light50}`,
  "&:hover": {
    borderRadius: "10px",
    // boxShadow:
    //   "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    // border: "none",
    //
    // backgroundColor: `${teal[50]}`,
    borderColor: `${teal[300]}`,
    "& .MuiListItemIcon-root": { color: `${teal[300]}` },
  },
  transition: theme.transitions.create(["backgroundColor", "boxShadow"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));
