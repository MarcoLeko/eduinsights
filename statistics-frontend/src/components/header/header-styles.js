import { makeStyles } from "@material-ui/core";
import { drawerWidth } from "./side-bar";

export const useHeaderStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["transform", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  appBarShift: {
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: -drawerWidth,
  },
  content: {
    flexGrow: 1,
    height: "100%",
    width: "100%",
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: "relative",
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: -drawerWidth,
  },
  indicator: {
    height: 4,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "initial",
  },
  iconSpacing: {
    padding: theme.spacing(0, 1),
  },
}));
