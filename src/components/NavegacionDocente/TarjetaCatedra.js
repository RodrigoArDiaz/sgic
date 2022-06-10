import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function OutlinedCard(props) {
  return (
    // <Box sx={{ minWidth: 100 }}>
    <Card variant="outlined">
      <React.Fragment>
        <CardContent>
          <Typography align="center" variant="h5" component="div">
            {props.catedra}
          </Typography>
        </CardContent>
        <CardActions sx={{ align: "center" }}>
          <Button
            size="small"
            onClick={() => {
              props.salto("2");
              props.setCat(props.idcatedra);
              props.setT("Seleccione la materia");
            }}
          >
            Ingresar
          </Button>
        </CardActions>
      </React.Fragment>
    </Card>
    // </Box>
  );
}
