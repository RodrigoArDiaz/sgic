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

const Paginacion = ({
  paginacion,
  setPaginaActual,
  setFilasPorPagina,
  cantidadResultados,
}) => {
  const handleChangePaginacion = (event, value) => {
    // actualizaDatosPaginacion({ paginaActual: value });
    setPaginaActual(value);
  };

  //
  const handleChangeFilasPorPagina = (event, value) => {
    setFilasPorPagina(value.props.value);
    console.log(value.props.value);
    setPaginaActual(1);
  };

  React.useEffect(() => {
    console.log(paginacion);
  }, []);

  return (
    <>
      {/* Paginacion se muestra solo si el total de paginas es mayor a 1*/}

      <Grid item>
        <Stack spacing={2}>
          <PaginationCustom
            count={paginacion.totalPaginas}
            page={paginacion.paginaActual}
            siblingCount={0}
            onChange={handleChangePaginacion}
          />
        </Stack>
      </Grid>

      <Grid item>
        <Box display="flex" textAlign="end" alignItems="center" gap={4}>
          <Box display="flex" textAlign="end" alignItems="center">
            <Typography
              variant="text"
              sx={{
                color: "text.subtitle1secondary",
                marginRight: 1,
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
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={paginacion.filasPorPagina}
                // label="Age"
                autoWidth
                onChange={handleChangeFilasPorPagina}
                sx={{
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
            {cantidadResultados}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Paginacion;
