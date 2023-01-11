import PropTypes from "prop-types";
import ApiIcon from "@mui/icons-material/Api";

// material-ui
import { Box, Card, Grid, IconButton } from "@mui/material";

// project import
// import AuthCard from "./AuthCard";
// import Logo from "../Logo2/Logo";
import Logo from "../Logo/Logo";
// import AuthFooter from "components/cards/AuthFooter";

// assets
import AuthBackground from "./AuthBackground";
import AuthCard from "./AuthCard";
import LogoAppName from "../Logo/LogoAppName";
import { BorderHorizontal } from "@mui/icons-material";

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children, maxWidthChildLg }) => (
  <Box sx={{ minHeight: "100vh" }}>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12} sx={{ ml: 3 }}>
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <Logo fontSize={50} />
          <Box sx={{ display: "inline-block" }}>
            <LogoAppName />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: { xs: "calc(100vh - 134px)", md: "calc(100vh - 112px)" },
          }}
        >
          <Grid item>
            {/* <AuthCard>{children}</AuthCard> */}
            <AuthCard
              sx={{
                maxWidth: { xs: 400, lg: maxWidthChildLg },
                margin: { xs: 2.5, md: 3 },
                "& > *": {
                  flexGrow: 1,
                  flexBasis: "50%",
                },
                boxShadow: "rgb(0 0 0 / 8%) 0px 1px 4px",
              }}
            >
              <Box
                sx={{
                  p: { xs: 2, sm: 3, md: 4, xl: 4 },
                  paddingX: { xl: 3 },
                  borderRadius: "4px",
                }}
              >
                {children}
              </Box>
            </AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        {/* <AuthFooter /> */}
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node,
  maxWidthChildLg: 375,
};

export default AuthWrapper;
