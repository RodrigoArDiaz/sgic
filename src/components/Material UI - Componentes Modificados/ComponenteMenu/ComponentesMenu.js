import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { IconButton, List, ListItem, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

export const drawerWidth = 270;
// export const drawerWidth = "24em";

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
    width: `calc(${theme.spacing(9)} + 1px)`,
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

/********************************
Componente AppBar
*/
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1, // +1 si se quiere que la barra de menu este por encima
  transition: theme.transitions.create(["width", "margin", "padding"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  //Padding por defecto
  // paddingLeft: "5.5rem",
  // paddingLeft: `${drawerWidth}px`,

  // //Ancho del menu minimmizado
  // [theme.breakpoints.up("sm")]: {
  //   ...(!open && {
  //     paddingLeft: `calc(${theme.spacing(10.5)} + 1px)`,
  //   }),
  // },

  //Ancho del menu minimmizado
  [theme.breakpoints.up("md")]: {
    ...(!open && {
      paddingLeft: `calc(${theme.spacing(9)} + 1px)`,
    }),
  },

  [theme.breakpoints.up("lg")]: {
    ...(!open && {
      paddingLeft: `calc(${theme.spacing(16)} + 1px)`,
    }),
  },

  //Ancho del menu minimmizado

  // [theme.breakpoints.up("lg")]: {
  //   ...(open && {
  //     paddingLeft: `calc(${theme.spacing(16)} + 1px)`,
  //   }),
  // },

  // //Estilo AppBar en pantallas < md
  // [theme.breakpoints.down("md")]: {
  //   paddingLeft: "0",
  //   width: "100%",
  // },

  //Estilo Appbar cuando menu lateral esta abierto
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,

    transition: theme.transitions.create(["width", "margin", "padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // paddingLeft: "0.2rem",

    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
      width: "100%",
    },

    [theme.breakpoints.up("lg")]: {
      paddingLeft: `calc(${theme.spacing(7)} + 1px)`,
    },
  }),

  //agregados
  background: theme.palette.primary.main400,
  // boxShadow: "-9px 1px 10px 2px rgb(0 0 0 / 12%)",
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
    boxShadow: theme.customShadows.z4,
    // theme.customShadows.z1,
    borderRight: "0px",
    backgroundColor: theme.palette.primary.main400,
  },
}));

/*******************************************
 * Componente personalizado del boton de menu
 */
export const ButtonMenu = styled(IconButton)(({ theme }) => ({
  marginLeft: "auto",
  color: theme.palette.icons.main,
  marginX: "1rem",
  borderRadius: "4px",
  backgroundColor: theme.palette.icons.bg,
  // color: theme.palette.primary.main,
  // backgroundColor: "rgba(0, 0, 0, 0.04)",
  // borderRadius: "10px",
  // border: `1px solid ${teal[300]}`,
  // "&:hover": {
  //   boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
  // },
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

  borderRadius: "4px",
  marginTop: "0.5rem",
  border: "1px solid rgba(0, 0, 0, 0)",

  "&:hover": {
    borderRadius: "4px",

    // borderColor: `${teal[300]}`,
    // "& .MuiListItemIcon-root": { color: `${teal[300]}` },
  },
  transition: theme.transitions.create(["backgroundColor", "boxShadow"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

/*************************************************
 *Componente personalizado para el titulo del menu
 */

export const TypographyTitulo = styled(Typography)(({ theme }) => ({
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));
