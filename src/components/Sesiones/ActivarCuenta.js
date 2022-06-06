import * as React from 'react';
import {useParams} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import {Button} from '@mui/material';
import * as Responses from '../Responses';

export default function ActivarCuenta() {

const navegar = useNavigate();
const [open, setOpen] = React.useState(false);
const [texto, setTexto] = React.useState('');
const Activar=useParams();

  const handleClose = () => {
    setOpen(false);
    navegar("/ingreso");
  };


  


React.useEffect(() => {

  var data = {
      Codigo:Activar.codigoActivacion,
      }

      
       Responses.consultas(data,'http://127.0.0.1:8000/api/activarcuenta').then(response=>{
        if(Responses.status===200){
          setTexto(response.Mensaje);
          setOpen(true);    

        }
        else if(Responses.status===401){
          navegar("/ingreso");
        }

        else if(Responses.status===460){
          
          setTexto(response.Error);
          setOpen(true);   
            
        }
        else {
          navegar("/error");
        }
    
      
    

      
     
  }  )
      .catch(error=>{
         navegar("/error");
  }); 

}, []);








  
  return (<div>
  
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle id="alert-dialog-title">
        {"Información"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {texto}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Aceptar</Button>
       
      </DialogActions>
    </Dialog>
  </div>);

}
