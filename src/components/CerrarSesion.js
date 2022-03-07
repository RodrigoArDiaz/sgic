import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useModal } from '../hooks/useModal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

export default function CerrarSesion({responsive}) {
    const [isOpen, handleOpen, handleClose] = useModal(false);



    const navegar = useNavigate();
    

        
    

    async function consultas(){

        const response = await fetch('http://127.0.0.1:8000/api/logout',
        {
            method: 'POST', 
            //body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.tkn

            }
          }
        );
          
        return await response.json();
    }



    const logout = (e) => {
        
        
        e.preventDefault();
        
        //const navegar = useNavigate();
       

        consultas().then(response=>{
           
           
            if(response.msg === undefined){
            console.log(response);
            //  
             
           }
           else{
              
            navegar("/");
           }
        })
        .catch(error=>{console.log(error);});

      

    }



    return (
        <>
            

            {responsive ?
                <Button 
                    size="large"
                    variant="outlined"
                    color="secondary"
                    endIcon={<LogoutIcon/>}
                    elevation={12}
                    onClick={handleOpen}
                    >
                        Cerrar Sesion
                </Button>
                :
                <Button 
                    sx={{display: {xs: 'none', sm:'flex'}}}
                    variant= "contained"
                    color="primary"
                    disableElevation      
                    endIcon={<LogoutIcon/>}
                    onClick={handleOpen}
                >    
                    Cerrar Sesion
                </Button>
            }

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Cerrar Sesion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Seguro que desea cerrar sesión?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={logout}>Aceptar</Button>
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog> 
    </>
    )
}
