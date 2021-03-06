import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Grid, TextField, Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

//Valor inicial 
const formInicial = {
  materia: "",
  carrera: "",
  planEstudio: "",
  codigoSIU: "",
}


export default function BuscarMaterias() {
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
  const handleClickLimpiar = (e) => {
    // setForm({
    //   ...form,
    //   catedra: "", 
    // });
    console.log(e.target);
  }


  return (
  <Paper
      component="form"
      sx={{ 
            p: '2px 4px', 
            display: 'flex',
            alignItems: 'center',
            // width: "100%",
            mt: "10px",
            px: 2,
            my: 3,
        }}
      elevation={1}
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
                  id="materia"
                  type='text'
                  placeholder='Materia'
                  endAdornment={
                    <InputAdornment 
                        position="end"
                        onClick={handleClickLimpiar}
                    >
                      <IconButton
                        aria-label="Limpiar campo materia"
                        // onMouseDown={handleMouseDownPassword}
                      >
                        <CloseIcon/>
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={handleChange}
                  value={form.materia}
                  name='materia'
                />
            </FormControl>
        </Grid>
        
        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="carrera"
                    type='text'
                    placeholder='Carrera'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickLimpiar}
                            // onMouseDown={handleMouseDownPassword}
                        >
                        <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.carrera}
                    name='carrera'
                />
            </FormControl> 
        </Grid>

        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="planEstudio"
                    type='text'
                    placeholder='Plan de estudio'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickLimpiar}
                        // onMouseDown={handleMouseDownPassword}
                        >
                        <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.planEstudio}
                    name='planEstudio'
                />
            </FormControl> 
        </Grid>

        <Grid item>
            <FormControl sx={{ m: 0.4 }} variant="standard">
                <Input
                    id="codigoSIU"
                    type='text'
                    placeholder='Codigo SIU'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickLimpiar}
                        // onMouseDown={handleMouseDownPassword}
                        >
                        <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={handleChange}
                    value={form.codigoSIU}
                    name='codigoSIU'
                />
            </FormControl> 
        </Grid>
        
        <Grid item xs="auto" sm="auto" alignSelf="center">
          <Box>
            <IconButton 
                // type="submit" 
                sx={{ p: '10px' }} 
                aria-label="Buscar materias">
              <SearchIcon/>
            </IconButton> 
          </Box>
        </Grid>
        
      </Grid>
    </Paper>
  );
}