import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ColorToggleButton(props) {
  const [alignment, setAlignment] = React.useState(props.fpp);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.actualizarfilas(newAlignment);
  };

  return (
    <ToggleButtonGroup
      sx={{ width: 50, height: 20 }}
      color="success"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="10">10</ToggleButton>
      <ToggleButton value="20">20</ToggleButton>
      <ToggleButton value="30">30</ToggleButton>
    </ToggleButtonGroup>
  );
}
