import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import { useModal } from '../useModal';


export var filas=[];
export var enunciados='';
export var correcciones='';
export var texto='';
//export const [enunciados, setEnc] = React.useState('');
//export const [correcciones, setCor] = React.useState('');
export function setEnunciados(props){
enunciados=props;

}


export function setTxt(props){
    texto=props;
    
    }

export function setCorrecciones(props){
    correcciones=props;
    
    }