// import * as React from "react";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// export default function ColorToggleButton(props) {
//   const [alignment, setAlignment] = React.useState(props.fpp);

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//     props.actualizarfilas(newAlignment);
//   };

//   return (
//     <ToggleButtonGroup
//       sx={{ width: 50, height: 20 }}
//       color="success"
//       value={alignment}
//       exclusive
//       onChange={handleChange}
//     >
//       <ToggleButton value="10">10</ToggleButton>
//       <ToggleButton value="20">20</ToggleButton>
//       <ToggleButton value="30">30</ToggleButton>
//     </ToggleButtonGroup>
//   );
// }

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilasPorPaginas(props) {
  const [age, setAge] = React.useState(props.fpp);

  const handleChange = (event) => {
    setAge(event.target.value);
    props.actualizarfilas(event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 0,
        minWidth: 60,
      }}
      size="small"
    >
      {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        // label="Age"
        autoWidth
        onChange={handleChange}
        sx={{
          // "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
          "& div": {
            padding: "5px 14px",
            paddingLeft: "3px",
          },

          // },
        }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    </FormControl>
  );
}
