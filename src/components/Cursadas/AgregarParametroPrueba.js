import React, { useState } from "react";
//MUI components
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  List,
  ListItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Slider,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { AddCircle, AddCircleOutline, CheckBox } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Input } from "@mui/material";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
//Elementos propios
import BotonTipoCalculo from "./BotonTipoCalculo";
import BotonTipoExamen from "./BotonTipoExamen";
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
//Peticiones
import * as Responses from "../Responses";
//Hooks propios
import { useModal } from "../useModal";
//React redux
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { CircularProgressWithLabel } from "../Material UI - Componentes Modificados/ComponentesEstadisticas/ComponentesEstadisticas";
import ItemParametroPractico from "./ItemParametroPractico";
import ItemParametroQuiz from "./ItemParametroQuiz";
//
import { ParametroContext } from "./ParametroContext";
import { useEffect } from "react";

export const AgregarParametroPrueba = ({ idcursada, ...props }) => {
  useEffect(() => {
    console.log("id cursada - contenedor: " + props.idcursada);
  }, []);

  const navegar = useNavigate();
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Porcentaje total
  // const [porcentajeTotal, setPorcentajeTotal] = useState(0);
  const [porcentajeP, setPorcentajeP] = useState(0);
  const [porcentajeQ, setPorcentajeQ] = useState(0);

  // //Escala calificacion TP
  // const [value, setValue] = React.useState(30);

  // const handleSliderChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const handleInputChange = (event) => {
  //   setValue(event.target.value === "" ? "" : Number(event.target.value));
  // };

  // const handleBlur = () => {
  //   if (value < 0) {
  //     setValue(0);
  //   } else if (value > 100) {
  //     setValue(100);
  //   }
  // };

  // // Porcentaje TP
  // const [porcentajeValue, setPorcentajeValue] = useState(0);

  // const handleSliderPorcentajeChange = (event, newValue) => {
  //   if (
  //     newValue + porcentajeValueQ + porcentajeValueP + porcentajeValueF <=
  //     100
  //   ) {
  //     setPorcentajeValue(newValue);
  //   }
  // };

  // const handleInputPorcentajeChange = (event) => {
  //   let newValue = event.target.value == "" ? 0 : Number(event.target.value);
  //   if (
  //     newValue + porcentajeValueQ + porcentajeValueP + porcentajeValueF <=
  //     100
  //   ) {
  //     setPorcentajeValue(
  //       event.target.value === "" ? "" : Number(event.target.value)
  //     );
  //   }

  //   // setPorcentajeValue(
  //   //   event.target.value === "" ? "" : Number(event.target.value)
  //   // );
  // };

  // const handleBlurPorcentaje = () => {
  //   if (porcentajeValue < 0) {
  //     setPorcentajeValue(0);
  //   } else if (porcentajeValue > 100) {
  //     setPorcentajeValue(100);
  //   }
  // };

  // //Escala calificacion QUIZ
  // const [valueQ, setValueQ] = React.useState(30);

  // const handleSliderChangeQ = (event, newValue) => {
  //   setValueQ(newValue);
  // };

  // const handleInputChangeQ = (event) => {
  //   setValueQ(event.target.value === "" ? "" : Number(event.target.value));
  // };

  // const handleBlurQ = () => {
  //   if (valueQ < 0) {
  //     setValueQ(0);
  //   } else if (valueQ > 100) {
  //     setValueQ(100);
  //   }
  // };

  // // Porcentaje QUIZ
  // const [porcentajeValueQ, setPorcentajeValueQ] = useState(0);

  // const handleSliderPorcentajeChangeQ = (event, newValue) => {
  //   if (
  //     newValue + porcentajeValue + porcentajeValueP + porcentajeValueF <=
  //     100
  //   ) {
  //     setPorcentajeValueQ(newValue);
  //   }
  // };

  // const handleInputPorcentajeChangeQ = (event) => {
  //   let newValue = event.target.value == "" ? 0 : Number(event.target.value);
  //   if (
  //     newValue + porcentajeValue + porcentajeValueP + porcentajeValueF <=
  //     100
  //   ) {
  //     setPorcentajeValueQ(
  //       event.target.value === "" ? "" : Number(event.target.value)
  //     );
  //   }
  // };

  // const handleBlurPorcentajeQ = () => {
  //   if (porcentajeValueQ < 0) {
  //     setPorcentajeValueQ(0);
  //   } else if (porcentajeValueQ > 100) {
  //     setPorcentajeValueQ(100);
  //   }
  // };

  // //Escala calificacion Parcial
  // const [valueP, setValueP] = React.useState(0);

  // const handleSliderChangeP = (event, newValue) => {
  //   setValueP(newValue);
  // };

  // const handleInputChangeP = (event) => {
  //   setValueP(event.target.value === "" ? "" : Number(event.target.value));
  // };

  // const handleBlurP = () => {
  //   if (valueQ < 0) {
  //     setValueP(0);
  //   } else if (valueQ > 100) {
  //     setValueP(100);
  //   }
  // };

  // // Porcentaje  Parcial
  // const [porcentajeValueP, setPorcentajeValueP] = useState(0);

  // const handleSliderPorcentajeChangeP = (event, newValue) => {
  //   if (
  //     newValue + porcentajeValue + porcentajeValueQ + porcentajeValueF <=
  //     100
  //   ) {
  //     setPorcentajeValueP(newValue);
  //   }
  // };

  // const handleInputPorcentajeChangeP = (event) => {
  //   let newValue = event.target.value == "" ? 0 : Number(event.target.value);
  //   if (
  //     newValue + porcentajeValue + porcentajeValueQ + porcentajeValueF <=
  //     100
  //   ) {
  //     setPorcentajeValueP(
  //       event.target.value === "" ? "" : Number(event.target.value)
  //     );
  //   }
  // };

  // const handleBlurPorcentajeP = () => {
  //   if (porcentajeValueP < 0) {
  //     setPorcentajeValueP(0);
  //   } else if (porcentajeValueP > 100) {
  //     setPorcentajeValueP(100);
  //   }
  // };

  // //Escala calificacion Final
  // const [valueF, setValueF] = React.useState(0);

  // const handleSliderChangeF = (event, newValue) => {
  //   setValueF(newValue);
  // };

  // const handleInputChangeF = (event) => {
  //   setValueF(event.target.value === "" ? "" : Number(event.target.value));
  // };

  // const handleBlurF = () => {
  //   if (valueF < 0) {
  //     setValueF(0);
  //   } else if (valueF > 100) {
  //     setValueF(100);
  //   }
  // };

  // // Porcentaje n Parcial
  // const [porcentajeValueF, setPorcentajeValueF] = useState(0);

  // const handleSliderPorcentajeChangeF = (event, newValue) => {
  //   if (
  //     newValue + porcentajeValue + porcentajeValueQ + porcentajeValueP <=
  //     100
  //   ) {
  //     setPorcentajeValueF(newValue);
  //   }
  // };

  // const handleInputPorcentajeChangeF = (event) => {
  //   let newValue = event.target.value == "" ? 0 : Number(event.target.value);
  //   if (
  //     newValue + porcentajeValue + porcentajeValueQ + porcentajeValueP <=
  //     100
  //   ) {
  //     setPorcentajeValueF(
  //       event.target.value === "" ? "" : Number(event.target.value)
  //     );
  //   }
  // };

  // const handleBlurPorcentajeF = () => {
  //   if (porcentajeValueF < 0) {
  //     setPorcentajeValueF(0);
  //   } else if (porcentajeValueF > 100) {
  //     setPorcentajeValueF(100);
  //   }
  // };

  //

  // React.useEffect(() => {
  //   // console.log("Valor TP: " + porcentajeValue);
  //   // console.log("Cambio variable");
  //   let newValue =
  //     (porcentajeValue === "" ? 0 : porcentajeValue) +
  //     (porcentajeValueQ === "" ? 0 : porcentajeValueQ) +
  //     (porcentajeValueP === "" ? 0 : porcentajeValueP) +
  //     (porcentajeValueF === "" ? 0 : porcentajeValueF);

  //   if (newValue <= 100) setPorcentajeTotal(newValue);
  // }, [porcentajeValue, porcentajeValueF, porcentajeValueP, porcentajeValueQ]);

  return (
    <>
      <Tooltip title="Agregar parámetro" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton
            color="secondary"
            size="small"
            onClick={handleOpen}
            // sx={{ color: "icons.secondary" }}
          >
            <AddCircleOutline />
          </IconButton>
        </span>
      </Tooltip>
      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="lg"
        // fullScreen={esXs ? true : false}
        fullScreen
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <AddCircleOutline sx={{ alignSelf: "center", marginRight: 1 }} />
          Agregar parámetro de examen
        </DialogTitle>

        <DialogContent>
          <DialogContentText marginBottom={1}>
            {props.Materia} - {props.anio} - {props.semestre}
          </DialogContentText>
          <DialogContentText>
            Ingrese los datos para agregar el parámetro de examen.
          </DialogContentText>

          <List>
            <ParametroContext.Provider
              value={{
                porcentajeP,
                setPorcentajeP,
                porcentajeQ,
                setPorcentajeQ,
                idcursada,
              }}
            >
              <Divider />
              {/* Trabajo practico */}
              <ListItem>
                <ItemParametroPractico />
              </ListItem>
              <Divider />

              {/* Quiz  */}
              <ListItem>
                <ItemParametroQuiz
                  abrir={props.abrir}
                  mensaje={props.mensaje}
                  tipo={props.tipo}
                />
              </ListItem>
              <Divider />

              {/* Parcial */}
              {/* <ListItem>
              <Grid container>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Parcial"
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
                      <Typography
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                        gutterBottom
                      >
                        Escala de calificación
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
                            value={value}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
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
                        value={typeof value === "number" ? value : 0}
                        onChange={handleSliderChange}
                      />
                    </Box>
                  </Grid>

                  <Grid item>
                    <Box width={300}>
                      <Typography
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                        gutterBottom
                      >
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
                            value={porcentajeValueP}
                            size="small"
                            onChange={handleInputPorcentajeChangeP}
                            onBlur={handleBlurPorcentajeP}
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
                        value={
                          typeof porcentajeValueP === "number"
                            ? porcentajeValueP
                            : 0
                        }
                        onChange={handleSliderPorcentajeChangeP}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
            <Divider /> */}

              {/* Final */}
              {/* <ListItem>
              <Grid container>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Final"
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
                      <Typography
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                        gutterBottom
                      >
                        Escala de calificación
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
                            value={value}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
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
                        value={typeof value === "number" ? value : 0}
                        onChange={handleSliderChange}
                      />
                    </Box>
                  </Grid>

                  <Grid item>
                    <Box width={300}>
                      <Typography
                        sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                        gutterBottom
                      >
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
                            value={porcentajeValueF}
                            size="small"
                            onChange={handleInputPorcentajeChangeF}
                            onBlur={handleBlurPorcentajeF}
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
                        value={
                          typeof porcentajeValueF === "number"
                            ? porcentajeValueF
                            : 0
                        }
                        onChange={handleSliderPorcentajeChangeF}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
            <Divider /> */}

              {/* Porcentaje total */}
              <ListItem>
                <Grid container>
                  <Grid item container justifyContent="space-evenly">
                    <Grid item>
                      <Box width={300}></Box>
                    </Grid>
                    <Grid item>
                      <Box width={300}></Box>
                    </Grid>

                    <Grid item>
                      <Box width={300} justifyContent="center">
                        <Box marginBottom={2}>
                          <Typography
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                            gutterBottom
                          >
                            Porcentaje total
                          </Typography>
                        </Box>

                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                        >
                          <CircularProgressWithLabel
                            value={
                              (porcentajeP == "" ? 0 : porcentajeP) +
                              (porcentajeQ == "" ? 0 : porcentajeQ)
                            }
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </ParametroContext.Provider>
          </List>
        </DialogContent>
        <DialogActions>
          {/* {DevolverBoton()} */}
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
