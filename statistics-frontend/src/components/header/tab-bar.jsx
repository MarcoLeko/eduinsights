import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { navItems } from "./navItems";
import { useUiContext } from "../../hooks/use-ui-context";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((muiBaseTheme) => ({
  MuiTabsRoot: {
    width: "100%",
  },
  indicator: {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: muiBaseTheme.palette.primary.main,
  },
  MuiTabRoot: {
    minHeight: 53,
    minWidth: 0,
    [muiBaseTheme.breakpoints.up("md")]: {
      minWidth: 0,
    },
    "&:hover": {
      backgroundColor: "none",
      color: muiBaseTheme.palette.primary.main,
    },
  },
  selected: {
    color: muiBaseTheme.palette.primary.main,
  },
  wrapper: {
    flexDirection: "row",
    "& svg": {
      fontSize: 26.25,
      margin: muiBaseTheme.spacing(0, 1),
    },
  },
}));

function TabBar() {
  const classes = useStyles();
  const history = useHistory();
  const { activeTab } = useUiContext();
  const navItemsForTabBar = navItems.map((item) => {
    if (!item.link) {
      return {
        name: "Home",
        link: "/",
      };
    }
    return item;
  });

  const [index, onChange] = useState(activeTab);

  function navigate(val) {
    onChange(val);

    if (navItemsForTabBar[val].link.includes("https://")) {
      window.location.href = navItemsForTabBar[val].link;
    } else {
      history.push(navItemsForTabBar[val].link);
    }
  }
  return (
    <Tabs
      variant={"fullWidth"}
      centered
      classes={{ root: classes.MuiTabsRoot, indicator: classes.indicator }}
      value={index}
      onChange={(e, val) => navigate(val)}
    >
      {navItemsForTabBar.map(({ name, link }, i) => (
        <Tab
          key={name}
          selected={i === activeTab}
          classes={{
            wrapper: classes.wrapper,
            selected: classes.selected,
            root: classes.MuiTabRoot,
          }}
          label={name}
          disableRipple
        />
      ))}
    </Tabs>
  );
}

export default TabBar;
