import PropTypes from "prop-types";

// material-ui
import { Box } from "@mui/material";

// project import
import AuthMainCard from "./AuthMainCard";

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }) => (
  <AuthMainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      },
      // boxShadow: "none",
      backgroundColor: "red",
    }}
    content={false}
    {...other}
    border={false}
    backgroundColor="transparent"
    // boxShadow
    // shadow={(theme) => theme.customShadows.z1}
  >
    <Box sx={{ p: { xs: 2, sm: 2, md: 2, xl: 1 } }}>{children}</Box>
  </AuthMainCard>
);

AuthCard.propTypes = {
  children: PropTypes.node,
};

export default AuthCard;
