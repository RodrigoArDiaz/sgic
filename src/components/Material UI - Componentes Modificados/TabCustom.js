import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

const TabCustom = styled((props) => <Tab {...props} />)(({ theme }) => ({
  // textTransform: "none",
  // fontWeight: theme.typography.fontWeightRegular,
  // fontSize: theme.typography.pxToRem(15),
  // marginRight: theme.spacing(1),
  color: theme.palette.icons.main,
  // "&.Mui-selected": {
  //   color: "#fff",
  // },
  // "&.Mui-focusVisible": {
  //   backgroundColor: "rgba(100, 95, 228, 0.32)",
  // },
}));

export { TabCustom };
