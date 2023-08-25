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
        // "& .MuiPagination-ul": { gap: "0.5rem" },
        "&  button": {
          borderColor: "rgb(230, 235, 241)",
        },

        "&  button.Mui-selected": {
          color: "rgb(255,255,255)!important",
          backgroundColor: "primary.main",
        },
      }}
      {...props}
    />
  );
};

export default PaginationCustom;
