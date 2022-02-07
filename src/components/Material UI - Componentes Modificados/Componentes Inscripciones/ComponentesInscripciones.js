import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import { OutlinedInput } from "@mui/material";

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
export { CardList, DivInfo, CardMain, OutlinedInputSearch };
