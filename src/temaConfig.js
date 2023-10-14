import { createTheme } from "@mui/material/styles";
import {
  blue,
  cyan,
  green,
  indigo,
  lightBlue,
  red,
  teal,
} from "@mui/material/colors";
import { blueGrey } from "@mui/material/colors";
import { NoEncryption } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    //Paleta del color primario
    primary: {
      //Principales
      // main: teal[800],
      // light: "#4fb3bf",
      // dark: "#005662",
      main: teal[500],
      light: "#52c7b8",
      dark: "#00675b",
      //Escalas
      light50: teal[50],
      main50: teal[50],
      main100: teal[100],
      main200: teal[200],
      main300: teal[300],
      main400: teal[400],
      main500: teal[500],
      main600: teal[600],
      main700: teal[700],
      main800: teal[800],
      main900: teal[900],
      mainA100: teal["A100"],
      mainA200: teal["A200"],
      mainA400: teal["A400"],
      mainA700: teal["A700"],
    },

    //Paleta del color secondario
    secondary: {
      //Principales
      main: blue[700],
      light: "#63a3ff",
      dark: "#004a9f",

      //Escalas
      light400: blue[400],
      light200: blue[200],
      light100: blue[100],
      light50: blue[50],
      //Escalas
      main50: blue[50],
      main100: blue[100],
      main200: blue[200],
      main300: blue[300],
      main400: blue[400],
      main500: blue[500],
      main600: blue[600],
      main700: blue[700],
      main800: blue[800],
      main900: blue[900],
      mainA100: blue["A100"],
      mainA200: blue["A200"],
      mainA400: blue["A400"],
      mainA700: blue["A700"],
    },

    error: {
      lightLow: "#ee9897",
      light: "#ef5350",
      main: "#d32f2f",
      dark: "#c62828",
    },

    success: {
      light: "#4caf50",
      main: "#2e7d32",
      dark: "#1b5e20",
    },

    tertiary: {
      main: "#fff",
    },

    white: {
      main: "rgb(255,255,255)",
    },

    //color: cyan
    cyan: {
      main: cyan[500],
      main50: cyan[50],
      main100: cyan[100],
      main200: cyan[200],
      main300: cyan[300],
      main400: cyan[400],
      main500: cyan[500],
      main600: cyan[600],
      main700: cyan[700],
      main800: cyan[800],
      main900: cyan[900],
      mainA100: "#84ffff",
      mainA200: "#18ffff",
      mainA400: "#00e5ff",
      mainA700: "#00b8d4",
    },

    icons: {
      main: "rgb(38, 38, 38)",
      secondary: "rgb(38, 38, 38)",
      tertiary: "rgba(38, 38, 38, 0.6)",
      bg: "rgb(245, 245, 245)",
      error: red[500],
      edit: blue[500],
      add: green[500],
      list: indigo[500],
    },

    borders: {
      main: "rgb(240, 240, 240)",
    },

    text: {
      titleprimary: "rgb(29, 36, 56)",
      bodysecondary: "rgb(148, 164, 196)",
      subtitle2secondary: "#696969",
      subtitle1secondary: "rgba(0, 0, 0, 0.6)",
    },

    background: {
      // default: "#e3f2fd",
      default: "rgb(243, 244, 249)",
    },
  },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          textTransform: "capitalize",
        },
        outlined: {
          textTransform: "capitalize",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgb(243, 244, 249)",
        },
      },
    },
  },

  //Tipografria
  typography: {
    //Font-size on the <html> element. This is used to adjust the rem value so the calculated font-size
    htmlFontSize: 18,

    //Family
    fontFamily: ["Public Sans", "sans-serif"].join(","),

    //Color
    color: "rgb(34, 51, 84)",

    //Titles
    h5: {
      // color: "rgb(52, 71, 103)",
      color: "rgb(29, 36, 56)",
      fontWeight: "500",
    },

    h6: {
      color: "rgb(29, 36, 56)",
      fontWeight: "500",
      // fontSize: {xs: "auto" , md:"1rem"}
    },

    subtitle2: {
      fontSize: "0.9rem",
    },
  },

  // Shadows custom
  customShadows: {
    z1: "rgba(95, 116, 141, 0.03) 0px 2px 1px -1px, rgba(95, 116, 141, 0.04) 0px 1px 1px 0px, rgba(95, 116, 141, 0.08) 0px 1px 3px 0px",
    z2: "0px 2px 8px rgb(0 0 0 / 15%)",
    z3: "rgb(0 0 0 / 15%) 0px 2px 8px",
    z4: "rgb(0 0 0 / 8%) 0px 1px 4px",
  },
});

export default theme;
