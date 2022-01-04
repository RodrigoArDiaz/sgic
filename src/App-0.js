import React from 'react';
import { Avatar, Button, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import {DeleteIcon } from '@mui/material';
import { Icon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import theme from './temaConfig';
import Navbar from './components/Navbar';
import AvatarUsuario from './components/AvatarUsuario';
import TarjetaPerfilUsuario from './components/TarjetaPerfilUsuario';
import { Box } from '@mui/system';
import {  Grid } from '@mui/material';
import MiniDrawer from './components/MiniDrawers';
import ResponsiveDrawer from './components/ResponsiveDrawer';

// // se define una constante
// const useStyles = makeStyles({
//   //Esto es una clase
//   miclase: {
//     // Aca va el codigo css, se usa el camelCase 
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   }
// })

function App() {

  // const misClases = useStyles();
  
  return (
    <>
      {/* <ResponsiveDrawer/> */}





      {/* <AvatarUsuario/>
      
      <hr />

      <Grid marginLeft={2}>
        <TarjetaPerfilUsuario></TarjetaPerfilUsuario>
      </Grid> */}
      

    

      <ThemeProvider theme={theme}>
          {/* <Navbar>

          </Navbar> */}
          <Button variant="contained" color="primary">
              Aceptar 
            </Button>

          <Button variant="contained" color="secondary">
            Cancelar
          </Button>
          
      </ThemeProvider>
      </>


    // <div >
    //   Material UI
    //   <Button color="primary">Esto es un boton</Button>
    //   <Button variant="contained" color="success">
    //     Inscribir alumno
    //   </Button>
    //   <Button variant="outlined" color="secondary">
    //     Inscribir alumno
    //   </Button>
    //   <Button variant="contained" color="success" fullWidth>
    //     Inscribir alumno
    //   </Button>
    //   <hr/>
    //   <Button variant="contained" color="success" size="small">
    //     Inscribir alumno
    //   </Button>

    //   <h2>Botones con iconos</h2>
    //   <div>
    //     <Button variant="contained" color="primary" endIcon={<ArrowForward/>}>
    //       Inscribir alumno
    //     </Button>

    //     <Button color="primary">
    //       <Delete/>
    //     </Button>

    //     <IconButton aria-label="delete" color="secondary">
    //       <Delete/>
    //     </IconButton>

    //     <h2>Iconos de https://fonts.google.com/icons </h2>
    //     {/* En minuscula */}
    //     <Icon>
    //         people
    //       </Icon>

    //     <IconButton aria-label="delete" color="secondary">
    //       <Icon>
    //         people
    //       </Icon>
    //     </IconButton>
    //   </div>

    //   <hr/>
    //   <h1>Tipografias</h1>

    //   <Typography variant="h1" color="initial">
    //     Esto es un h1
    //   </Typography>

    //   <Typography variant="h6" color="initial">
    //     Esto es un h6
    //   </Typography>

    //   <Typography variant="h1" color="initial">
    //     Esto es un h1
    //   </Typography>

    //   <Typography variant="h4" color="secondary">
    //     Esto es un h4 con color secundario
    //   </Typography>

    //   <Typography variant="body1" color="initial" align="center" paragraph>
    //     Esto es un body centrado con margen
    //   </Typography>

      
    //   <Typography variant="body1" color="initial" align="center" >
    //     Esto es un body centrado con 
    //   </Typography>
      
    // </div>
    // <div>
    //     <Typography variant="h5" color="initial">
    //       Make style con css
    //    </Typography>

       

    //   <Button className={misClases.miclase}>
    //     Mi boton personalizado
    //   </Button>

    //   {/* Se tiene que llamar a make style, npm install @mui/styles */}
    // </div>

    // // Theme provider
    
    //   <ThemeProvider theme={theme}>
    //      <Button variant="contained" color="primary">
    //         Aceptar 
    //       </Button>

    //     <Button variant="contained" color="secondary">
    //        Cancelar
    //     </Button>
    //   </ThemeProvider>

    
     

    
  );
}

export default App;
