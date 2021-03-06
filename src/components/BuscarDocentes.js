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

//Valor inicial 
const formInicial = {
  apellidos: "",
  nombres: "",
  dni: "",
  email: "",
  bajas: false,
}


export default function BuscarDocentes() {
  //variable de 
  const [form, setForm] = useState(formInicial);

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
    // const {name, value} = e.target;
    setForm({
       ...form,
       [e.target.name]: e.target.checked, 
    });
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
                    id="apellidos"
                    type='text'
                    placeholder='Apellidos'
                
                    endAdornment={
                        <InputAdornment 
                            position="end"
                        >
                            <IconButton
                                aria-label="Limpiar campo apellidos"
                                onClick={() => {
                                    handleClickLimpiar("apellidos");
                                }}
                                
                            >
                                <CloseIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.apellidos}
                    name='apellidos'
                />
            </FormControl>
        </Grid>
            
        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="nombres"
                    type='text'
                    placeholder='Nombres'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Limpiar campo nombres"
                            onClick={() => {
                                handleClickLimpiar("nombres");
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.nombres}
                    name='nombres'
                />
            </FormControl> 
        </Grid>

        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="dni"
                    type='text'
                    placeholder='DNI'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Limpiar campo dni"
                            onClick={() => {
                                handleClickLimpiar("dni");
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.dni}
                    name='dni'
                />
            </FormControl> 
        </Grid>

        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="email"
                    type='text'
                    placeholder='Email'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Limpiar campo email"
                            onClick={() => {
                                handleClickLimpiar("email");
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.email}
                    name='email'
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
          >
            Buscar
          </Button>
        </Grid>
        
      </Grid>
    </Paper>
  );
}