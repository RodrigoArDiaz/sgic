import * as React from "react";
//Material UI
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
//React router
import { Link as RouterLink } from "react-router-dom";

/*** Componente BreadCrumbs***/
export default function BreadCrumbs({ crumbs }) {
  const last = crumbs ? crumbs.length - 1 : false;

  return (
    <Box>
      <Stack spacing={2}>
        {crumbs && (
          <Breadcrumbs
            // separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {crumbs.map((crumb, index) => {
              return (
                <>
                  <Link
                    underline="hover"
                    color={last == index ? "text.primary" : "inherit"}
                    to={crumb.to}
                    component={RouterLink}
                  >
                    {crumb.nombreRuta}
                  </Link>
                </>
              );
            })}
          </Breadcrumbs>
        )}
      </Stack>
    </Box>
  );
}
