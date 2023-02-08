import React from "react";
import {
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import PaginationCustom from "./Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";

const Paginacion = ({ paginacion, setPaginaActual }) => {
  const handleChangePaginacion = (event, value) => {
    // actualizaDatosPaginacion({ paginaActual: value });
    setPaginaActual(value);
  };

  React.useEffect(() => {
    console.log(paginacion);
  }, []);

  return (
    <>
      {/* Paginacion se muestra solo si el total de paginas es mayor a 1*/}
      {/* {paginacion.totalPaginas > 1 && ( */}
      <Grid item>
        <Stack spacing={2}>
          <PaginationCustom
            // count={paginacion.totalPaginas != 0 ? paginacion.totalPaginas : 1}
            count={paginacion.totalPaginas}
            page={paginacion.paginaActual}
            siblingCount={0}
            // count={4}
            // page={1}
            // defaultPage={1}
            onChange={handleChangePaginacion}
          />
        </Stack>
      </Grid>
      {/* )} */}

      <Grid item>
        <Box display="flex" textAlign="end" alignItems="center" gap={4}>
          <Box display="flex" textAlign="end" alignItems="center">
            <Typography
              variant="text"
              sx={{
                color: "text.subtitle1secondary",
                marginRight: 1,
                // fontSize: "",
              }}
            >
              Filas por página:
            </Typography>
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
                value={10}
                // label="Age"
                autoWidth
                // onChange={handleChange}
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
          </Box>

          <Box>
            <Typography
              variant="text"
              sx={{ color: "text.subtitle1secondary", marginRight: 1 }}
            >
              Resultados:
            </Typography>
            2
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Paginacion;
