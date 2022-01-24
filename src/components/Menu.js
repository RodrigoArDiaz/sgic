import * as React from "react";
import Box from "@mui/material/Box";
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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import SchoolIcon from "@mui/icons-material/School";
import { Link, Outlet } from "react-router-dom";
// import BreadCrumbs from "./BreadCrumbs.js";
import MenuUsuario from "./MenuUsuario.js";
import { DrawerHeader, AppBar, Drawer } from "../styles/EstilosMenu.js";
import MenuResponsive from "./MenuResponsive.js";

const informacionUsuario = {
  nombre: "Juan",
  apellido: "Perez",
  tipo: "Superadministrador",
  email: "perez_juan@gmail.com",
};

/** */
export default function Menu(props) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        color="primary"
        sx={{
          paddingLeft: "5.5px",
        }}
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
            Gestion Catedras
          </Typography>

          <MenuUsuario informacionUsuario={informacionUsuario} />

          <MenuResponsive informacionUsuario={informacionUsuario} />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
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
            key="catedras"
            sx={{ paddingLeft: 3.1 }}
            component={Link}
            to="catedras"
          >
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Catedras" />
          </ListItem>

          <ListItem
            button
            key="docentes"
            sx={{ paddingLeft: 3.1 }}
            component={Link}
            to="docentes"
          >
            <ListItemIcon>
              <CoPresentIcon />
            </ListItemIcon>
            <ListItemText primary="Docentes" />
          </ListItem>

          <ListItem
            button
            key="alumnos"
            sx={{ paddingLeft: 3.1, borderLeftWidth: "6px" }}
            component={Link}
            to="alumnos"
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Alumnos" />
          </ListItem>
        </List>
        {/* <Divider /> */}
      </Drawer>

      {/* Pagina */}
      <Outlet />
      {/* Pagina */}
    </Box>
  );
}
