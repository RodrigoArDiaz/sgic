import { TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

const TableRowElevacion = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": { border: 0 }, //Estilo por defecto dado en MUI
  "&:hover": {
    boxShadow: "rgb(0 0 0 / 15%) 1px 0px 12px 0px",
  },
}));

export { TableRowElevacion };
