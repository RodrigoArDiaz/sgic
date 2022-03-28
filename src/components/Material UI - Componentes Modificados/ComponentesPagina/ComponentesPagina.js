import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import { Divider, OutlinedInput } from "@mui/material";

const CardList = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  border: "1.5px solid rgb(227, 242, 253)",
  border: `1px solid ${blue["100"]}`,
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",

  "&:hover": {
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
  },
}));

const DivInfo = styled("div")(({ theme }) => ({
  background: orange["50"],
  borderRadius: "10px",
  padding: "0.3rem 1rem",
}));

/**Componente Card Conenedor*/
const CardMain = styled(Card)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "none",
  // boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
  // boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
  // boxShadow: " rgba(0, 0, 0, 0.09) 0px 3px 12px",
  // boxShadow:
  //   "rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px",
  // "rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem",
  border: `1px solid ${theme.palette.secondary.light100}`,
}));

// /**Componente Busqueda*/
const OutlinedInputSearch = styled(OutlinedInput)(({ theme }) => ({
  paddingRight: 0,
  borderRadius: "10px",
  border: "none",
  backgroundColor: "rgba(0, 0, 0, 0.04)",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0,0,0,0.10)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary.main,
  },

  "&:focus,&:hover  .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

//Divider bordes transparentes

const DividerExtremoTransp = styled(Divider)(({ theme }) => ({
  flexShrink: "0",
  borderWidth: "0",
  borderStyle: "solid",
  borderColor: "rgba(0, 0, 0, 0.12)",
  borderBottomWidth: "thin",
  backgroundColor: "transparent",
  backgroundImage:
    "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0))!important",
  height: "0.0625rem",
  margin: "1rem 0",
  marginBottom: "0",
  borderBottom: "none",
  opacity: "0.5",
}));

//
export {
  CardList,
  DivInfo,
  CardMain,
  OutlinedInputSearch,
  DividerExtremoTransp,
};
