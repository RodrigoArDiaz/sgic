import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, InputLabel } from "@mui/material";

/*** Componente BotonTipo ***/
export default function BotonTipo(props) {
  const [anio, setAnio] = React.useState("25");

  React.useEffect(() => {
    console.log(props.parametros.res[0].IdParametro);
  }, []);

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
      <Grid container>
        <Grid item xs={12} sm={5}>
          <FormControl
            variant="standard"
            fullWidth
            sx={{ mt: "15px", maxWidth: "300px" }}
          >
            <InputLabel htmlFor="tipo">Tipo de examen</InputLabel>
            <Select
              value={anio}
              onChange={handleChange}
              displayEmpty
              // inputProps={{ "aria-label": "Without label" }}
              // size="small"
            >
              <MenuItem value={25} sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                Seleccione el tipo de examen
              </MenuItem>
              {props.parametros.res.map((row) => {
                return (
                  <MenuItem value={row.IdParametro} key={row.Tipo}>
                    {Tipo(row.Tipo)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
