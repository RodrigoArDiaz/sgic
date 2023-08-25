import * as React from "react";
//MUI
import { Chip } from "@mui/material";
import { Grid } from "@mui/material";

/*** Componente BotonGrupo ***/
export const BotonGrupo = (props) => {
  const [salto, setSalto] = React.useState(props.grupos);

  return (
    <>
      {salto === "S" && (
        <Grid item xs={12} sm="auto">
          <Chip variant="outlined" color="success" label="Admite" />
        </Grid>
      )}
      {salto === "N" && (
        <Grid item xs={12} sm="auto">
          <Chip variant="outlined" color="error" label="No admite" />
        </Grid>
      )}
    </>
  );
};
