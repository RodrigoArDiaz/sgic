import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { Icon, Tooltip } from "@mui/material";
import { Drawer as DrawerResponsive } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import {
  DrawerHeader,
  AppBar,
  Drawer,
  drawerWidth,
  ButtonMenu,
  ListMenu,
  ListItemMenu,
} from "../../components/Material UI - Componentes Modificados/ComponenteMenu/ComponentesMenu";
import MenuUsuarioDesplegable from "../MenuUsuarioDesplegable.js";

const listaItemsMenu = [
  {
    key: "catedras",
    itemText: "Catedras",
    to: "catedras",
    icon: "account_balance",
  },
  {
    key: "docentes",
    itemText: "Docentes",
    to: "docentes",
    icon: "co_present",
  },
  {
    key: "alumnos",
    itemText: "Alumnos",
    to: "alumnos",
    icon: "school",
  },
];

/** */
export default function Menu() {
  const [open, setOpen] = React.useState(false);
  const [listaItems, setListaItems] = useState(listaItemsMenu);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header */}
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
            onClick={handleDrawerToggle}
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

          <MenuUsuarioDesplegable />
        </Toolbar>
      </AppBar>

      {/* Menu screen>=sm */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader sx={!open && { justifyContent: "center" }}>
          <ButtonMenu disableRipple onClick={handleDrawerToggle}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </ButtonMenu>
        </DrawerHeader>
        <Divider />
        <ListMenu>
          {/*Link de React-Dom*/}
          {listaItems.map((ele, index) => {
            return (
              <ListItemMenu
                button
                key={ele.key}
                sx={{ paddingLeft: 3.1 }}
                component={Link}
                to={ele.to}
              >
                <ListItemIcon>
                  <Tooltip title={ele.itemText} placement="right">
                    <Icon>{ele.icon}</Icon>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={ele.itemText} />
              </ListItemMenu>
            );
          })}
        </ListMenu>
      </Drawer>

      {/* Menu responsive */}
      <DrawerResponsive
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <DrawerHeader>
          <ButtonMenu disableRipple onClick={handleDrawerToggle}>
            <CloseIcon />
          </ButtonMenu>
        </DrawerHeader>
        <Divider />
        <ListMenu>
          {/*Link de React-Dom*/}
          {listaItems.map((ele, index) => {
            return (
              <ListItemMenu
                button
                key={ele.key}
                sx={{ paddingLeft: 3.1 }}
                component={Link}
                to={ele.to}
              >
                <ListItemIcon>
                  <Tooltip title={ele.itemText} placement="right">
                    <Icon>{ele.icon}</Icon>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={ele.itemText} />
              </ListItemMenu>
            );
          })}
        </ListMenu>
      </DrawerResponsive>
      {/* Pagina */}
      {/* <Outlet /> */}
      {/* Pagina */}

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}
