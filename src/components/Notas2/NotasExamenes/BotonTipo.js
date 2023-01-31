import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";

export default function BotonTipo(props) {
  const [anio, setAnio] = React.useState("25");

  const handleChange = (event) => {
    setAnio(event.target.value);

    if (event.target.value !== 25) {
      var data = {
        pNom: "",
        pAp: "",
        pLib: "",
        pGru: "",

        Offset: 0,
        Limite: props.filasxpagina,
        pidPar: event.target.value,
        pidCu: props.cursada.IdCursada,
      };

      props.botb("1");
      props.actualizar(data);
    }
  };

  function Valor(param) {
    if (param === undefined) {
      return "";
    }
    return param;
  }

  function Tipo(param) {
    if (param === "P") return "Parcial";
    if (param === "Q") return "Quiz";
    if (param === "F") return "Final";
  }

  return (
    <Box paddingX={2} paddingY={1}>
      <Grid container spacing={1}>
        <Grid item xs={8} sx={6} md={3} lg={2}>
          <FormControl fullWidth>
            <Select
              value={anio}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value={25}>Seleccione el tipo de examen</MenuItem>
              {props.parametros.res.map((row) => {
                return (
                  <MenuItem value={row.IdParametro}>{Tipo(row.Tipo)}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
