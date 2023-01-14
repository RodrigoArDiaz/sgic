import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import { Divider, OutlinedInput, ToggleButton } from "@mui/material";

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

//ToggleButton customizado
const CustomerToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: "10px",
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
  margin: "0.4rem 0",
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
  CustomerToggleButton,
};
