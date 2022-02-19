import React from "react";
import { Pagination } from "@mui/material";
import { Box } from "@mui/system";

const Paginacion = ({ paginacion, actualizaDatosPaginacion }) => {
  const handleChangePaginacion = (event, value) => {
    actualizaDatosPaginacion({ paginaActual: value });
  };

  return (
    <Box
      width="100%"
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      // sx={{ paddingX: { xs: "0" } }}
    >
      {/* {pagina} */}
      <Pagination
        size="large"
        variant="outlined"
        count={paginacion.totalPaginas}
        page={paginacion.paginaActual}
        siblingCount={0}
        color="info"
        sx={{ "& .MuiPagination-ul": { gap: "0.5rem" } }}
        onChange={handleChangePaginacion}
      />
    </Box>
  );
};

export default Paginacion;
