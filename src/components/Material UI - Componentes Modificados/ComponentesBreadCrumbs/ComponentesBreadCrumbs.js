import styled from "@emotion/styled";
import { Grid } from "@mui/material";

/*******************************************
 * Componente personalizado para contenedor de breadcrumbs
 */
export const GridBreadCrumbs = styled(Grid)(({ theme }) => ({
  // backgroundColor: "#fff",
  // borderRadius: "10px",
  // border: "1px solid",
  // borderColor: theme.palette.secondary.light100,
  backgroundColor: "#fff",
  borderRadius: "10px",
  // border: "1px solid",
  // borderColor: "secondary.light100",
  border: "none",
  boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
  //
  // backgroundColor: "transparent",
}));
