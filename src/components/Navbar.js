import { Typography } from '@mui/material';
import React from 'react';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/private-theming';
import theme from '../temaConfig';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

import AvatarUsuario from './AvatarUsuario';


const useStyles = makeStyles( theme => ({
    offset: theme.mixins.toolbar
}));

function Navbar() {
    const classes = useStyles();

    return (  
        
        <div>
            <AppBar >
                
                <Toolbar color="primary">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                            Inicio
                    </Typography>

                    {/* <AvatarUsuario /> */}

                </Toolbar>
            </AppBar>
            <div className ={classes.offset}></div>
        </div>
    
    );
}

export default Navbar;