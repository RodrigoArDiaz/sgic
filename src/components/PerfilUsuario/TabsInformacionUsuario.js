import * as React from "react";
import PropTypes from "prop-types";
//MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//Componentes propios
import PanelInformacionDeContactos from "./PanelInformacionContactos";
import PanelSeguridad from "./PanelSeguridad";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

/*** Componente TabsInformacionUsuario ***/
export default function TabsInformacionUsuario() {
  const { user } = useSelector((state) => state.user);

  //Se chequea si el usuario es un alumno
  // const esAlumno = user.Tipo == "A" ? true : false;
  const esAlumno = true;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Tabs no admite fragmento como children

  return (
    <>
      <Box
      // sx={{ borderBottom: 1, borderColor: "divider", width: "auto" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="basic tabs example"
          // centered
        >
          {esAlumno && (
            <Tab
              icon={<ContactsOutlinedIcon />}
              iconPosition="start"
              label="Informacion de contacto"
              {...a11yProps(0)}
            />
          )}

          {esAlumno && (
            <Tab
              icon={<LockOutlinedIcon />}
              iconPosition="start"
              label="Seguridad"
              {...a11yProps(1)}
            />
          )}

          {!esAlumno && (
            <Tab
              icon={<LockOutlinedIcon />}
              iconPosition="start"
              label="Seguridad"
              {...a11yProps(0)}
            />
          )}
        </Tabs>
      </Box>
      {/* Paneles */}
      <Grid item xs={12}>
        {esAlumno && (
          <TabPanel value={value} index={0}>
            <PanelInformacionDeContactos />
          </TabPanel>
        )}
        {esAlumno && (
          <TabPanel value={value} index={1}>
            <PanelSeguridad />
          </TabPanel>
        )}

        {!esAlumno && (
          <TabPanel value={value} index={0}>
            <PanelSeguridad />
          </TabPanel>
        )}
      </Grid>
    </>
  );
}
