import { styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Link } from "react-router";

export const StyledAppBar = styled(MuiAppBar)(() => ({
  zIndex: 1,
}));

export const StyledLogoLink = styled(Link)(() => ({
  width: 130,
  height: 55,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",

  "& img": {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
}));
