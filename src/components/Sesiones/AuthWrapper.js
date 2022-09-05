import PropTypes from "prop-types";

// material-ui
import { Box, Card, Grid } from "@mui/material";

// project import
// import AuthCard from "./AuthCard";
import Logo from "../Logo/Logo";
// import AuthFooter from "components/cards/AuthFooter";

// assets
import AuthBackground from "./AuthBackground";
import AuthCard from "./AuthCard";

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
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
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <Logo />
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
                maxWidth: { xs: 400, lg: 475 },
                margin: { xs: 2.5, md: 3 },
                "& > *": {
                  flexGrow: 1,
                  flexBasis: "50%",
                },
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
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
};

export default AuthWrapper;
