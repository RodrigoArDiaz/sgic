import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@mui/material";
import MenuUsuario from "../components/MenuUsuario.js";
import MenuResponsive from "../components/MenuResponsive.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import PaginaDocentesCursadasCuerpo from "./PaginaDocentesCursadasCuerpo.js";
import PaginaDocentesPracticos from "./PaginaDocentesPracticos.js";
import PaginaDocentesExamenes from "./PaginaDocentesExamenes.js";
import PaginaDocentesGrupos from "./PaginaDocentesGrupos.js";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckIcon from "@mui/icons-material/Check";
import GroupIcon from "@mui/icons-material/Group";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import PaginaDocentesInscripciones from "./PaginaDocentesInscripciones.js";
import PaginaDocentesNotas from "./PaginaDocentesNotas.js";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const informacionUsuario = {
  nombre: "Juan",
  apellido: "Perez",
  tipo: "Superadministrador",
  email: "perez_juan@gmail.com",
};

//********* */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  //misma elevation que AppBar
  boxShadow:
    "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
});

//********* */
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  //Esconder drawer en mobile
  [theme.breakpoints.down("md")]: {
    width: `0px`,
  },
  //misma elevation que AppBar
  boxShadow:
    "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
});

//********* */
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//********* */
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//********* Setea la propiedad open de MuiDrawer*/
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
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
}));

/*
const navegar = useNavigate();
    
  
async function consultas(data){

    const response = await fetch('http://127.0.0.1:8000/api/acceso/alumnos',
    {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
      
    return await response.json();
}
*/

/** */
export default function PaginaDocentesCursadas(props) {
  // console.log(JSON.parse(localStorage.jsoncursada));

  const [cursada, setC] = React.useState(JSON.parse(localStorage.jsoncursada));
  const [materia, setM] = React.useState(JSON.parse(localStorage.jsonmateria));
  const navegar = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [salto, setSalto] = React.useState("1");

  /*const cambiarvariable = (dato) => {
    setSalto(dato);
  };
*/

  function Modulo(props) {
    if (props.cambio === "1") {
      return <PaginaDocentesCursadasCuerpo cursada={cursada} />;
    }
    if (props.cambio === "2") {
      return <PaginaDocentesPracticos />;
    }
    if (props.cambio === "3") {
      return <PaginaDocentesExamenes />;
    }
    if (props.cambio === "4") {
      return <PaginaDocentesGrupos />;
    }
    if (props.cambio === "5") {
      return <PaginaDocentesInscripciones />;
    }
    if (props.cambio === "6") {
      return <PaginaDocentesNotas />;
    }
  }

  //console.log(JSON.parse(localStorage.jsoncursada));

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={props.theme}>
        <AppBar
          position="fixed"
          open={open}
          color="primary"
          sx={{
            paddingLeft: "5.5px",
          }}
          // elevation={16}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: "1" }}
            >
              {materia.Materia} - {cursada.Anio} - Semestre {cursada.Semestre}
            </Typography>

            <MenuUsuario informacionUsuario={informacionUsuario} />

            <MenuResponsive informacionUsuario={informacionUsuario} />
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open} elevation={24} sx>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {/*Link de React-Dom*/}
            <ListItem
              button
              key="inicio"
              sx={{ paddingLeft: 3.1, borderLeftWidth: "6px" }}
              onClick={() => {
                navegar("/docentes/ingreso");
              }}
            >
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>

            <ListItem
              button
              key="cursadas"
              sx={{ paddingLeft: 3.1 }}
              onClick={() => setSalto("1")}
            >
              <ListItemIcon>
                <InsertInvitationIcon />
              </ListItemIcon>
              <ListItemText primary="Cursada" />
            </ListItem>

            <ListItem
              button
              key="practicos"
              sx={{ paddingLeft: 3.1 }}
              onClick={() => setSalto("2")}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Prácticos" />
            </ListItem>

            <ListItem
              button
              key="examenes"
              sx={{ paddingLeft: 3.1, borderLeftWidth: "6px" }}
              onClick={() => setSalto("3")}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Exámenes" />
            </ListItem>

            <ListItem
              button
              key="grupos"
              sx={{ paddingLeft: 3.1, borderLeftWidth: "6px" }}
              onClick={() => setSalto("4")}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Grupos" />
            </ListItem>

            <ListItem
              button
              key="inscripciones"
              sx={{ paddingLeft: 3.1, borderLeftWidth: "6px" }}
              onClick={() => setSalto("5")}
            >
              <ListItemIcon>
                <CoPresentIcon />
              </ListItemIcon>
              <ListItemText primary="Inscripciones" />
            </ListItem>

            <ListItem
              button
              key="notas"
              sx={{ paddingLeft: 3.1, borderLeftWidth: "6px" }}
              onClick={() => setSalto("6")}
            >
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Notas" />
            </ListItem>
          </List>
          {/* <Divider /> */}
        </Drawer>
        {<Modulo cambio={salto} />}
        {/* Aqui van las paginas ******** */}
        {/*      <Routes>             
            
              <Route
                  path="/"
                  element={<PaginaCatedras/>}
              />
              
              <Route
                  path="/docentes"
                  element={<PaginaDocentes/>}
              />
        
              <Route
                  path="/alumnos"
                  element={<PaginaAlumnos/>}
              />
          
              <Route
                  path="*"
                  element={<PaginaCatedras/>}
              />  
        </Routes>}
        {/* **** */}
      </ThemeProvider>
    </Box>
  );
}
