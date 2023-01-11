import React from "react";
import { Pagination } from "@mui/material";

const PaginationCustom = (props) => {
  return (
    <Pagination
      shape="rounded"
      size="medium"
      // color="info"
      color="primary"
      variant="outlined"
      sx={{
        "& .MuiPagination-ul": { gap: "0.5rem" },
      }}
      {...props}
    />
  );
};

export default PaginationCustom;
