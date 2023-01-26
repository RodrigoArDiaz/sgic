import {
  amber,
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

const randomColor = () => {
  let rango = 300;

  let arrayColor = [
    red[rango],
    purple[rango],
    deepPurple[rango],
    indigo[rango],
    blue[rango],
    lightBlue[rango],
    cyan[rango],
    teal[rango],
    green[rango],
    lightGreen[rango],
    lime[rango],
    yellow[rango],
    amber[rango],
    orange[rango],
    deepOrange[rango],
  ];

  const index = Math.floor(Math.random() * arrayColor.length);

  return arrayColor[index];
};

export { randomColor };
