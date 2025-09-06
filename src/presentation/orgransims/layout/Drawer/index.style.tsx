import { styled, type Theme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { List } from "@mui/material";

const drawerWidth = "240px";
const drawerCollapsedWidth = "44px";

const drawerOpenedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const drawerClosedMixin = (theme: Theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: drawerCollapsedWidth,
  "& .MuiListItemButton-root": {
    padding: "8px 4px",
    "& .MuiListItemText-root": {
      transition: theme.transitions.create("display", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      display: "none",
    },
  },
});

type StyledProps = {
  canDrawerCollapse?: boolean;
  open?: boolean;
}

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "canDrawerCollapse",
})<StyledProps>(({ canDrawerCollapse, open, theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  "& .MuiDrawer-paper": {
    position: "relative",
    width: drawerWidth,
    flexShrink: 0,
    border: "none",
    whiteSpace: "nowrap",
    backgroundColor: theme.palette.background.default,
    ...(canDrawerCollapse && {
      position: "absolute",
    }),
    ...(open && {
      ...drawerOpenedMixin(theme),
    }),
    ...(!open && {
      ...drawerClosedMixin(theme),
    }),
  },
  ...(canDrawerCollapse && {
    "&+ main": {
      marginLeft: 44,
    },
  }),
}));

export const StyledList = styled(List)(() => ({
  flexGrow: "1",
  overflowY: "auto",
  padding: "8px 4px",
}));
