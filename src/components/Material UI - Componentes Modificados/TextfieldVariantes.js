import { styled } from "@mui/material/styles";
import { OutlinedInput } from "@mui/material";

/**Input para mostrar datos */
const OutlinedInputOnlyRead = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.04)",
  "& .MuiOutlinedInput-input.MuiOutlinedInput-input": {
    WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
  },
}));
export { OutlinedInputOnlyRead };
