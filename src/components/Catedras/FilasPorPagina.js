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
      sx={{ width: 50, height: 25 }}
      color="info"
      size="medium"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="1">1</ToggleButton>
      <ToggleButton value="2">2</ToggleButton>
      <ToggleButton value="3">3</ToggleButton>
    </ToggleButtonGroup>
  );
}
