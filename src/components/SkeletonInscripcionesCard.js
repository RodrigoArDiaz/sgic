import React from "react";
// material-ui
import { CardHeader, Divider, Skeleton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardList } from "./Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

const estilosCardInscripciones = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

const SkeletonInscripcionesCard = () => {
  return (
    <CardList sx={estilosCardInscripciones}>
      <CardHeader
        sx={{ marginBottom: "auto", paddingBottom: "0" }}
        textAlign="center"
        title={<Skeleton variant="rectangular" height={50} />}
      />
      <CardContent
        sx={{
          borderBottom: "1.5px solid rgb(227, 242, 253)",
        }}
      >
        <Divider sx={{ mb: "1rem" }}></Divider>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign="center">
          <Skeleton variant="rectangular" sx={{ mb: 1.4 }} />
          <Skeleton variant="rectangular" />
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="body2">
          <Skeleton variant="rectangular" sx={{ mb: 1.4 }} />
          <Skeleton variant="rectangular" />
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Skeleton variant="rectangular" width={150} height={50} />
        <Divider orientation="vertical" />
        <Skeleton variant="rectangular" width={150} height={40} />
      </CardActions>
    </CardList>
  );
};

export default SkeletonInscripcionesCard;
