

import * as React from 'react';
//import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function SnackBar(props) {
  const [open, setOpen] = React.useState(props.abrir);
  const [estado, setEstado] = React.useState('1');
  const [transition, setTransition] = React.useState(TransitionRight);
  const [tipo, setTipo] = React.useState(props.tipo);



  /*
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };
*/
  const handleClose = () => {
   if(estado==='2'){
    setOpen(false);
    props.cambiar();
    //setEstado('1');
    //props.cambiar();
    //console.log("Aqui deberia ser falso"+ open);
  }
  setEstado('2'); //sconsole.log("Aqui deberia ser true"+open)
  };



  const handleClose2 = () => {
    if(estado==='2'){
     setOpen(false);
     props.cambiar2();
     //setEstado('1');
     //props.cambiar();
     //console.log("Aqui deberia ser falso"+ open);
   }
   setEstado('2'); //sconsole.log("Aqui deberia ser true"+open)
   };

  //console.log(open);

  if (tipo==='1'){
  return (

         <Snackbar
        open={open}
        onClose={handleClose}
        //TransitionComponent={transition}
        //message="Nota Inválida"
        key={ transition.name }
        autoHideDuration={3000}
      ><Alert severity="error">Nota Inválida</Alert></Snackbar>
    
  );}



  if (tipo==='2'){
    return (
  
           <Snackbar
          open={open}
          onClose={handleClose2}
          //TransitionComponent={transition}
          //message="Nota Inválida"
          key={ transition.name }
          autoHideDuration={3000}
        ><Alert severity="success">Nota modificada con éxito</Alert></Snackbar>
      
    );}



}
