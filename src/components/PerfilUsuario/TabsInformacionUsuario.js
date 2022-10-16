import * as React from "react";
import PropTypes from "prop-types";
//MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//Componentes propios
import PanelDatosPersonales from "./PanelDatosPersonales";
import PanelInformacionDeContactos from "./PanelInformacionContactos";
import PanelSeguridad from "./PanelSeguridad";

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

export default function TabsInformacionUsuario() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          centered
        >
          {/* <Tab
            icon={<InfoOutlinedIcon />}
            iconPosition="start"
            label="Datos personales"
            {...a11yProps(0)}
          /> */}
          <Tab
            icon={<PermContactCalendarOutlinedIcon />}
            iconPosition="start"
            label="Informacion de contacto"
            {...a11yProps(0)}
          />
          <Tab
            icon={<LockOutlinedIcon />}
            iconPosition="start"
            label="Seguridad"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      {/* Paneles */}
      <Grid item xs={12}>
        {/* <TabPanel value={value} index={0}>
          <PanelDatosPersonales />
        </TabPanel> */}
        <TabPanel value={value} index={0}>
          <PanelInformacionDeContactos />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PanelSeguridad />
        </TabPanel>
      </Grid>
    </>
  );
}
