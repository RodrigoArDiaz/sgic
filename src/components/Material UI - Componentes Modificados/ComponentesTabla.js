import { TableCell, TableRow, tableCellClasses, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

//
const TableRowElevacion = styled(TableRow)(({ theme }) => ({
  // "&:last-child td, &:last-child th": { border: 0 }, //Estilo por defecto dado en MUI
  "&:hover": {
    // boxShadow: "rgb(0 0 0 / 15%) 1px 0px 12px 0px",
    backgroundColor: "rgba(55, 65, 81, 0.04)",
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

const TableCell1emPaddingXReducido = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    // color: "rgb(103, 116, 142)",
    // fontWeight: "400",
    fontSize: "1em",
    paddingRight: "3px",
    paddingLeft: "3px",
  },
}));

const TableCellHead = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.icons.bg,
    // backgroundColor: theme.palette.primary.main,
    // color: "rgb(255,255,255)",

    borderTop: "1px solid rgba(224, 224, 224, 1)",
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 14,
    // borderTop: "rgba(224, 224, 224, 1)",
  },
}));

const TableRowHead = styled(TableRow)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.icons.bg,
    // color: theme.palette.common.white,
    border: "rgba(224, 224, 224, 1)",
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 14,
    border: "rgba(224, 224, 224, 1)",
  },
}));

const TableCell1emPaddingXReducidoOverFocus = styled(TableCell)(
  ({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: "1em",
      padding: "0",
      paddingRight: "3px",
      paddingLeft: "3px",

      position: "relative",
      height: "1px", //Para que que el hijo ocupe el 100% al darle la propiedad height: 100%

      maxWidth: "150px",

      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",

      "&:hover": {
        overflow: "inherit",
      },
    },
  })
);

const ContentCellDestacable = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  //No usar flex para alinear sino no funciona la propiedad textoverflow
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  //
  paddingTop: "8px",
  paddingBottom: "6px",

  "&:hover": {
    backgroundColor: theme.palette.white.main,
    boxShadow: theme.customShadows.z2,
    position: "absolute",
    right: "0",
    left: "0",
    top: "0",
    bottom: "0",
    //
    minWidth: "max-content",
    zIndex: "100",
    paddingRight: "10px",
    paddingLeft: "6px",
  },
}));

export {
  TableRowElevacion,
  TableCellMedium,
  TableCellDestacada,
  TableCellComun,
  TableCell1em,
  TableCellHead,
  TableRowHead,
  TableCell1emPaddingXReducido,
  TableCell1emPaddingXReducidoOverFocus,
  ContentCellDestacable,
};
