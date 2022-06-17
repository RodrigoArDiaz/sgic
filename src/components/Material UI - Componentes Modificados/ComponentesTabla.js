import { TableCell, TableRow, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

//
const TableRowElevacion = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": { border: 0 }, //Estilo por defecto dado en MUI
  "&:hover": {
    boxShadow: "rgb(0 0 0 / 15%) 1px 0px 12px 0px",
  },
}));

//
const TableCellMedium = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
  },
}));

const TableCellDestacada = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: "rgb(52, 71, 103)",
    fontWeight: "500",
  },
}));

const TableCellComun = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: "rgb(103, 116, 142)",
    fontWeight: "400",
  },
}));

const TableCell1em = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    // color: "rgb(103, 116, 142)",
    // fontWeight: "400",
    fontSize: "1em",
  },
}));

export {
  TableRowElevacion,
  TableCellMedium,
  TableCellDestacada,
  TableCellComun,
  TableCell1em,
};
