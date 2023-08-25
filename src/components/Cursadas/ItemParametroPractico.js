import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ParametroContext } from "./ParametroContext";

const ItemParametroPractico = () => {
  //Variables de contexto
  const { porcentajeP, setPorcentajeP, porcentajeQ } =
    useContext(ParametroContext);

  //Escala calificacion TP
  const [valueEscala, setValueEscala] = useState(30);

  const handleSliderChangeEscala = (event, newValue) => {
    setValueEscala(newValue);
  };

  const handleInputChangeEscala = (event) => {
    setValueEscala(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlurEscala = () => {
    if (valueEscala < 0) {
      setValueEscala(0);
    } else if (valueEscala > 100) {
      setValueEscala(100);
    }
  };

  // Porcentaje TP
  // const [valuePorcentaje, setValuePorcentaje] = useState(0);

  const handleSliderChangePorcentaje = (event, newValue) => {
    if (newValue + porcentajeQ <= 100) {
      setPorcentajeP(newValue);
      // handleSetPorcentajeTotal(porcentajeTotal + newValue);
    }
  };

  const handleInputChangePorcentaje = (event) => {
    let newValue = event.target.value == "" ? 0 : Number(event.target.value);
    if (newValue + porcentajeQ <= 100) {
      setPorcentajeP(
        event.target.value === "" ? "" : Number(event.target.value)
      );
    }
  };

  const handleBlurPorcentaje = () => {
    if (porcentajeP < 0) {
      setPorcentajeP(0);
    } else if (porcentajeP > 100) {
      setPorcentajeP(100);
    }
  };

  // useEffect(() => {
  //   // handleSetPorcentajeTotal(4);
  // }, [valuePorcentaje]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Trabajo practico"
          />
        </FormGroup>
      </Grid>

      <Grid item container justifyContent="space-evenly">
        <Grid item>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Cálculo
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio color="secondary" />}
                label="Acumulable"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="male"
                control={<Radio color="secondary" />}
                label="Promediable"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <Box width={300}>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }} gutterBottom>
              Escala de calificación
            </Typography>

            <Box display="flex" justifyContent="center">
              <FormControl
                // sx={{ m: 1, width: "7ch" }}
                variant="outlined"
                size="small"
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                  value={valueEscala}
                  size="small"
                  onChange={handleInputChangeEscala}
                  onBlur={handleBlurEscala}
                />
              </FormControl>
            </Box>

            <Slider
              defaultValue={100}
              aria-label="Default"
              valueLabelDisplay="auto"
              color="secondary"
              marks={[
                { value: 0, label: "0" },
                { value: 100, label: "100" },
              ]}
              value={typeof valueEscala === "number" ? valueEscala : 0}
              onChange={handleSliderChangeEscala}
            />
          </Box>
        </Grid>

        <Grid item>
          <Box width={300}>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }} gutterBottom>
              Porcentaje de peso sobre nota final
            </Typography>

            <Box display="flex" justifyContent="center">
              <FormControl variant="outlined" size="small">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                  value={porcentajeP}
                  size="small"
                  onChange={handleInputChangePorcentaje}
                  onBlur={handleBlurPorcentaje}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Slider
              defaultValue={0}
              aria-label="Default"
              valueLabelDisplay="auto"
              color="secondary"
              marks={[
                { value: 0, label: "0%" },
                { value: 50, label: "50%" },
                { value: 100, label: "100%" },
              ]}
              value={typeof porcentajeP === "number" ? porcentajeP : 0}
              onChange={handleSliderChangePorcentaje}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemParametroPractico;
