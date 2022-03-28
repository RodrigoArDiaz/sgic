import { createTheme } from "@mui/material/styles";
import { cyan, teal } from "@mui/material/colors";
import { blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      //Principales
      main: teal[400],
      light: teal[500],
      dark: teal[900],
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
      mainA100: "#a7ffeb",
      mainA200: "#64ffda",
      mainA400: "#1de9b6",
      mainA700: "#00bfa5",
    },

    secondary: {
      //Principales
      main: blueGrey[500],
      light: blueGrey[300],
      dark: blueGrey[700],

      light400: blueGrey[400],
      light200: blueGrey[200],
      light100: blueGrey[100],
      light50: blueGrey[50],
      //Escalas
      main50: blueGrey[50],
      main100: blueGrey[100],
      main200: blueGrey[200],
      main300: blueGrey[300],
      main400: blueGrey[400],
      main500: blueGrey[500],
      main600: blueGrey[600],
      main700: blueGrey[700],
      main800: blueGrey[800],
      main900: blueGrey[900],
      mainA100: "#cfd8dc",
      mainA200: "#b0bec5",
      mainA400: "#78909c",
      mainA700: "#455a64",
    },

    tertiary: {
      main: "#fff",
    },

    white: {
      main: "#fff",
    },

    cyan: {
      main: cyan[500],
      main50: cyan[50],
      main100: cyan[100],
      main200: cyan[200],
      main300: cyan[300],
      main400: cyan[400],
    },

    text: {
      titleprimary: "rgb(29, 36, 56)",
      bodysecondary: "rgb(148, 164, 196)",
    },

    background: {
      // default: "#e3f2fd",
      default: "rgb(242, 245, 249)",
    },
  },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // borderRadius: 20,
          borderRadius: "10px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // ...darkScrollbar(),
          color: "darkred",
          // backgroundColor: "#e3f2fd",
          backgroundColor: "rgb(242, 245, 249)",
          // "& h1": {
          //   color: "black"
          // }
        },
      },
    },
  },
  // shape: {
  //     borderRadius: 0
  // }

  // typography: {
  //   fontFamily: [
  //     "-apple-system",
  //     "BlinkMacSystemFont",
  //     '"Segoe UI"',
  //     "Roboto",
  //     '"Helvetica Neue"',
  //     "Arial",
  //     "sans-serif",
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(","),
  // },

  // typography: {
  //   fontFamily: [
  //     "PlusJakartaSans-ExtraBold",
  //     "-apple-system",
  //     "BlinkMacSystemFont",
  //     "Segoe UI",
  //     "Roboto",
  //     "Helvetica Neue",
  //     "Arial,sans-serif",
  //     "Apple Color Emoji",
  //     "Segoe UI Emoji",
  //     "Segoe UI Symbol",
  //   ].join(","),
  // },

  // typography: {
  //   fontFamily: [
  //     "Inter",
  //     "-apple-system",
  //     "BlinkMacSystemFont",
  //     '"Segoe UI"',
  //     "Helvetica",
  //     "Arial",
  //     "sans-serif",
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //   ].join(","),
  // },

  typography: {
    color: "rgb(34, 51, 84)",
    h5: {
      // color: "rgb(52, 71, 103)",
      color: "rgb(29, 36, 56)",
      fontWeight: "500",
    },

    h6: {
      color: "rgb(29, 36, 56)",
      fontWeight: "500",
    },
  },
});

export default theme;
