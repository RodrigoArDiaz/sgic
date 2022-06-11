import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { Box } from "@mui/material";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BreadCrumbs() {
  // const breadcrumbs = [
  //   <Link
  //     underline="hover"
  //     key="1"
  //     color="inherit"
  //     href="/"
  //     onClick={handleClick}>
  //     SGIC
  //   </Link>,
  //   <Typography key="3" color="text.primary">
  //     Catedras
  //   </Typography>,
  // ];

  const crumbs = [
    {
      nombreRuta: "Inicio",
      href: "enlace",
    },
    {
      nombreRuta: "Inicio",
      href: "enlace",
    },
    {
      nombreRuta: "Inicio",
      href: "enlace",
    },
  ];

  return (
    <Box py={1} pl={2}>
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {/* {breadcrumbs} */}
          <Link
            underline="hover"
            key="1"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
            onClick={handleClick}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Inicio
          </Link>

          {crumbs.map((crumb, index) => {
            return (
              <Link
                underline="hover"
                key="1"
                color="inherit"
                href="/"
                onClick={handleClick}
              >
                SGIC
              </Link>
            );
          })}
        </Breadcrumbs>
      </Stack>
    </Box>
  );
}
