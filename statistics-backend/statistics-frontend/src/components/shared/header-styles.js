import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const useHeaderStyles = makeStyles((theme) => ({
  navigation: {
    transition: theme.transitions.create(["transform", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  navigationShift: {
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: -drawerWidth,
  },
  content: {
    height: "100%",
    width: "100%",
    transition: theme.transitions.create(["left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: "relative",
    left: 0,
  },
  contentShift: {
    transition: theme.transitions.create("left", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    left: -drawerWidth,
  },
}));

export { drawerWidth, useHeaderStyles };
