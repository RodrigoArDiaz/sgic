import {createTheme} from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { blueGrey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: teal[600],
            light:teal[500],
            dark: teal[900],
        },

        secondary: {
            main: blueGrey[500],
            light:blueGrey[300],
            dark: blueGrey[700],
        },
        tertiary: {
            main: "#fff",
        }
    },
    components: {
        // Name of the component
        MuiButton: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              borderRadius: 20
            },
          },
        },
    },
    // shape: {
    //     borderRadius: 0
    // }
});

export default theme;