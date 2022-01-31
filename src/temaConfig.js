import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
import { blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[600],
      light: teal[500],
      dark: teal[900],
      light50: teal[50],
    },

    secondary: {
      main: blueGrey[500],
      light: blueGrey[300],
      dark: blueGrey[700],
    },
    tertiary: {
      main: "#fff",
    },
    background: {
      default: "#e3f2fd",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderRadius: 20,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // ...darkScrollbar(),
          color: "darkred",
          backgroundColor: "#e3f2fd",
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
});

export default theme;
