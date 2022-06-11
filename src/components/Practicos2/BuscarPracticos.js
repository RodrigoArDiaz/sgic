import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

 
const formInicial = {
  practico: "",
  orden: "",
    bajas: "B",
}


export default function BuscarPracticos(props) {
   
  const [form, setForm] = useState(formInicial);
 
  function manejador(){

    var data = {

        pPractico:form.practico,
        pOrden:form.orden,
        piB:form.bajas,
      Offset:0,
      Limite:props.filasxpagina,
      pidCu:props.cursada.IdCursada,
        }

  props.actualizar(data);
 
  }
 



  //handle para campo 'catedra'
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
       ...form,
       [name]: value, 
    });
  };

  //handle para campo 'bajas'
  const handleChecked = (e) => {
    
    if (e.target.checked===true){
    setForm({
       ...form,
       [e.target.name]: "B", 
    });
  }

else {setForm({
  ...form,
  [e.target.name]: "A", 
});}

  };

  //handle para boton 'limpiar'
  const handleClickLimpiar = (inputName) => {   
    setForm({
        ...form,
        [inputName]: "", 
    });
  }



  return (
  <Paper
      // component="form"
      sx={{ 
            p: '2px 4px', 
            display: 'flex',
            alignItems: 'center',
            // width: "100%",
            mt: "10px",
            px: 2,
        }}
      elevation={3}
    >

      <Grid 
        container 
        spacing={2}
        justifyContent='space-between'
        alignItems="flex-center"
        
      >
       
        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="practico"
                    type='text'
                    placeholder='Práctico'
                
                    endAdornment={
                        <InputAdornment 
                            position="end"
                        >
                            <IconButton
                                aria-label="Limpiar campo practico"
                                onClick={() => {
                                    handleClickLimpiar("practico");
                                }}
                                
                            >
                                <CloseIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.practico}
                    name='practico'
                />
            </FormControl>
        </Grid>
            
        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="orden"
                    type='text'
                    placeholder='Orden'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Limpiar campo orden"
                            onClick={() => {
                                handleClickLimpiar("orden");
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.orden}
                    name='orden'
                />
            </FormControl> 
        </Grid>

        

        <Grid item>
            <FormGroup>
              <FormControlLabel 
                  control={
                    <Checkbox 
                      defaultChecked 
                      name='bajas'
                      onChange={handleChecked}  
                    />
                  } 
                  label="Incluir bajas" />
            </FormGroup>   
        </Grid>  
          
        <Grid item xs="auto" sm="auto" alignSelf="center">
          <Button startIcon={ <SearchIcon/>} color='secondary'
    onClick={()=>{manejador()}}         >
            Buscar
          </Button>
        </Grid>
        
      </Grid>
    </Paper>
  );
}