import {
  AddCircleRounded,
  AddOutlined,
  EditOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { ParametroContext } from "./ParametroContext";
import * as Responses from "../Responses";
import { useEffect } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const ItemParametroQuiz = ({ props }) => {
  // useEffect(() => {
  //   console.log(props.idcursada);
  // }, []);

  //Variables de contexto
  const { porcentajeP, setPorcentajeQ, porcentajeQ, idcursada } =
    useContext(ParametroContext);

  //State checked
  const [checkedQ, setCheckedQ] = useState(false);

  //State tipo de calculo
  const [calculo, setCalculo] = React.useState("P");

  const handleChangeCalculo = (event) => {
    setCalculo(event.target.value);
    console.log(event.target.value);
  };

  //State Escala calificacion TP
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

  //State Porcentaje TP
  // const [valuePorcentaje, setValuePorcentaje] = useState(0);

  const handleSliderChangePorcentaje = (event, newValue) => {
    if (newValue + porcentajeP <= 100) {
      setPorcentajeQ(newValue);
    }
  };

  const handleInputChangePorcentaje = (event) => {
    let newValue = event.target.value == "" ? 0 : Number(event.target.value);
    if (newValue + porcentajeP <= 100) {
      setPorcentajeQ(
        event.target.value === "" ? "" : Number(event.target.value)
      );
    }
  };

  const handleBlurPorcentaje = () => {
    if (porcentajeQ < 0) {
      setPorcentajeQ(0);
    } else if (porcentajeQ > 100) {
      setPorcentajeQ(100);
    }
  };

  //HandleChange
  //handle para campo 'bajas'
  const handleChecked = (e) => {
    // const {name, value} = e.target;
    if (e.target.checked === true) {
      console.log("check quiz");

      var data = {
        Tipo: "Q",
        Escala: valueEscala,
        PNT: porcentajeQ,
        Calculo: calculo,
        IdCursada: idcursada,
      };

      console.log(data);

      Responses.consultas(data, "http://127.0.0.1:8000/api/agregarparametro")
        .then((response) => {
          if (Responses.status === 200) {
            console.log("a");
            // setT("");
            // setC("");
            // setP("");
            // setEs("");

            // setForm({
            //   tipo: "",
            //   calculo: "",
            //   pnt: "",
            //   escala: "",
            // });

            props.abrir(true);
            props.mensaje("Parámetro de examen agregado con éxito");
            props.tipo("success");
            // handleClose();
          } else if (Responses.status === 401) {
            // navegar("/ingreso");
          } else if (Responses.status === 460) {
            if (response.tipo !== undefined) {
              // setErrors({ ...errors, tipo: response.tipo });
              // setT("2");
              console.log(response.tipo);
            }

            if (response.calculo !== undefined) {
              // setErrors({ ...errors, calculo: response.calculo });
              // setC("2");
              console.log(response.calculo);
            }

            if (response.pnt !== undefined) {
              // setErrors({ ...errors, pnt: response.pnt });
              // setP("2");
              console.log(response.pnt);
            }

            if (response.escala !== undefined) {
              // setErrors({ ...errors, escala: response.escala });
              // setEs("2");
              console.log(response.escala);
            }
          } else {
            // navegar("/error");
          }
        })
        .catch((error) => {
          // navegar("/error");
        });
    }
    // else {
    //   setForm({
    //     ...form,
    //     [e.target.name]: "A",
    //   });
    // }
  };

  //Componente
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkboxQ"
                  onChange={handleChecked}
                  // icon={<AddCircleRounded sx={{ color: "primary.main" }} />}
                  // checkedIcon={<AddCircleOutlineRoundedIcon />}
                />
              }
              label="Quiz"
            />
          </FormGroup>

          {/* <Box display="inline-flex" alignItems="center">
            <Tooltip title="Agregar parametro">
              <IconButton>
                <AddCircleOutlineRoundedIcon color="primary"></AddCircleOutlineRoundedIcon>
              </IconButton>
            </Tooltip>
            <Typography>Quiz</Typography>
          </Box> */}

          <Button
            variant="contained"
            size="small"
            startIcon={<EditOutlined></EditOutlined>}
          >
            Modificar
          </Button>
        </Box>
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
              name="calculo"
              // value={calculo}
              onChange={handleChangeCalculo}
            >
              <FormControlLabel
                value="A"
                control={<Radio color="secondary" />}
                label="Acumulable"
                labelPlacement="bottom"
                checked={calculo == "A" ? true : false}
              />
              <FormControlLabel
                value="P"
                control={<Radio color="secondary" />}
                label="Promediable"
                labelPlacement="bottom"
                checked={calculo == "P" ? true : false}
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
              {" "}
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
                  value={porcentajeQ}
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
              value={typeof porcentajeQ === "number" ? porcentajeQ : 0}
              onChange={handleSliderChangePorcentaje}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemParametroQuiz;
