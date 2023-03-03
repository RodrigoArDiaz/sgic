// import React from "react";
// import {
//   Box,
//   CardContent,
//   CardHeader,
//   Divider,
//   Icon,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { Grid } from "@mui/material";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import NotasContenedorPracticos from "./NotasContenedorPracticos";
// import NotasContenedorExamenes from "./NotasExamenes/NotasContenedorExamenes";
// import SituacionFinalContenedor from "./SituacionFinal/SituacionFinalContenedor";
// import { useSelector } from "react-redux";
// import { blue } from "@mui/material/colors";

// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// // import TabContext from "@mui/lab/TabContext";
// import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
// import {
//   Article,
//   ArticleOutlined,
//   Assignment,
//   AssignmentOutlined,
//   FactCheck,
//   GradingOutlined,
// } from "@mui/icons-material";
// import CardMainPageHeader from "../Material UI - Componentes Modificados/CardMainPageHeader";
// import { TabCustom } from "../Material UI - Componentes Modificados/TabCustom";

// export default function NotasContenedor(props) {
//   //Recupero informacion de la cursada
//   const { cursada } = useSelector((state) => state.cursada);

//   const [titulo, setTitulo] = React.useState("Trabajos Prácticos");
//   const [cambiocontexto, setCT] = React.useState("1");

//   const handleChange = (event, newValue) => {
//     setCT(newValue);
//   };

//   return (
//     <>
//       <Box paddingBottom={2}>
//         <Typography
//           variant="h2"
//           sx={{
//             margin: "0px",
//             fontWeight: "500",
//             fontSize: "1.775rem",
//             lineHeight: "1.27",
//             fontFamily: "Public Sans, sans-serif",
//           }}
//         >
//           Notas
//         </Typography>
//       </Box>

//       <CardMainPage visibleHeader={false}>
//         <CardContent sx={{ padding: 0 }}>
//           <Grid container>
//             {/* Cuerpo pagina */}
//             <Grid item xs={12}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   bgcolor: "transparent",
//                 }}
//               >
//                 {/* <TabContext value={cambiocontexto}> */}
//                 <Box
//                   sx={
//                     {
//                       // borderBottom: 1,
//                       // borderColor: "divider",
//                       // bgcolor: "transparent",
//                     }
//                   }
//                   paddingX={2}
//                 >
//                   <Tab
//                     // onChange={handleChange}
//                     // aria-label="notas"
//                     // indicatorColor="secondary"
//                     // centered
//                     // orientation="vertical"
//                   >
//                     <TabCustom
//                       label="Trabajos Prácticos"
//                       value="1"
//                       icon={<ArticleOutlined fontSize="small" />}
//                       iconPosition="start"
//                     />
//                     <TabCustom
//                       label="Exámenes"
//                       value="2"
//                       icon={<AssignmentOutlined fontSize="small" />}
//                       iconPosition="start"
//                     />
//                     <TabCustom
//                       label="Situación Final"
//                       value="3"
//                       icon={<GradingOutlined fontSize="small" />}
//                       iconPosition="start"
//                     />
//                   </Tab>
//                 </Box>
//                 <Divider />

//                 <Box>
//                   {/* <CardMainPage
//                       visibleHeader={false}
//                       bgColorIcon={blue[500]}
//                       sx={{
//                         marginTop: "10px",
//                         paddingBottom: "0",
//                         "& .MuiCardContent-root:last-child": {
//                           paddingBottom: "0",
//                         },
//                       }}
//                     >
//                       <CardContent
//                         sx={{
//                           paddingX: "0",
//                           paddingY: "0",
//                           "&:last-child": {
//                             paddingBottom: "0",
//                           },
//                         }}
//                       > */}
//                   <TabPanel value="1" sx={{ paddingX: 0, paddingY: 0 }}>
//                     <NotasContenedorPracticos
//                       cursada={cursada}
//                       titulo="Trabajos Prácticos"
//                     />
//                   </TabPanel>

//                   <TabPanel value="2" sx={{ paddingX: "0", paddingTop: 1 }}>
//                     <NotasContenedorExamenes
//                       cursada={cursada}
//                       titulo="Exámenes"
//                     />
//                   </TabPanel>

//                   <TabPanel value="3" sx={{ paddingX: "0", paddingTop: 1 }}>
//                     <SituacionFinalContenedor
//                       cursada={cursada}
//                       titulo="Situación Final"
//                     />
//                   </TabPanel>
//                   {/* </CardContent>
//                     </CardMainPage> */}
//                 </Box>
//                 {/* </TabContext> */}
//               </Paper>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </CardMainPage>
//     </>
//   );
// }

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { CardContent } from "@mui/material";
import { ArticleOutlined } from "@mui/icons-material";
import { TabCustom } from "../Material UI - Componentes Modificados/TabCustom";
import { useSelector } from "react-redux";
import NotasContenedorPracticos from "./NotasContenedorPracticos";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

export default function BasicTabs({ props }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  return (
    <>
      <Box paddingBottom={2}>
        <Typography
          variant="h2"
          sx={{
            margin: "0px",
            fontWeight: "500",
            fontSize: "1.775rem",
            lineHeight: "1.27",
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          Notas
        </Typography>
      </Box>

      <CardMainPage visibleHeader={false}>
        <CardContent sx={{ padding: 0 }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <TabCustom
                  label="Prácticos"
                  {...a11yProps(0)}
                  icon={<ArticleOutlined fontSize="small" />}
                  iconPosition="start"
                />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <NotasContenedorPracticos
                cursada={cursada}
                titulo="Trabajos Prácticos"
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </CardContent>
      </CardMainPage>
    </>
  );
}
