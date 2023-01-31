import styled from "@emotion/styled";
import { Input, OutlinedInput, TableCell } from "@mui/material";

/********************************
 *
 */
const TableCellEditable = styled(TableCell)(({ theme }) => ({
  paddingX: "0",
}));

/*******************************
 *
 */
const InputEditable = styled(Input)(({ theme }) => ({
  textAlign: "center",
  "& input": {
    textAlign: "center",
  },
}));

/*******************************
 * Componente Busqueda*/
const OutlinedInputEditable = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: "0px",
  "& fieldset.MuiOutlinedInput-notchedOutline": {
    outlineColor: "rgba(0,0,0,0.10)",
    borderColor: "rgba(0,0,0,0)",
    color: "#000",
  },
  "& input": {
    textAlign: "center",
  },
}));

export { TableCellEditable, InputEditable, OutlinedInputEditable };
