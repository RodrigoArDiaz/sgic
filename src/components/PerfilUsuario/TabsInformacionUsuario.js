import * as React from "react";
import PropTypes from "prop-types";
//MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
//
import InformacionUsuario from "./InformacionUsuario";
import InformacionDeContactos from "./InformacionContactos";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    <Grid container>
      <Grid item xs={12}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="basic tabs example"
        >
          <Tab
            icon={<InfoOutlinedIcon />}
            iconPosition="start"
            label="Datos personales"
            {...a11yProps(0)}
          />
          <Tab
            icon={<PermContactCalendarOutlinedIcon />}
            iconPosition="start"
            label="Informacion de contacto"
            {...a11yProps(1)}
          />
        </Tabs>
      </Grid>

      {/* Paneles */}
      <Grid item xs={12}>
        <TabPanel value={value} index={0}>
          <InformacionUsuario />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InformacionDeContactos />
          {/* <InformacionUsuario /> */}
        </TabPanel>
      </Grid>
    </Grid>
  );
}
