import React, { useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
} from "@material-ui/core";
import "./mobile-navgation.scss";
import { navItems } from "../shared/navItems";
import { useUiContext } from "../../hooks/use-ui-context";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { useHeaderStyles } from "../shared/header-styles";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveTab } from "../../context/ui-actions";

const useStyles = (theming) =>
  makeStyles(() => ({
    root: {
      backgroundColor: theming === "dark" ? "#212121" : "#f5f5f5",
    },
  }));

export function MobileNavigation() {
  const { theme } = useUiContext();
  const history = useHistory();
  const classes = useStyles(theme)();

  const classesHeader = useHeaderStyles(theme);
  const { activeTab, sidebarOpen, dispatch } = useUiContext();

  useEffect(() => {
    dispatch(setActiveTab(null));
  }, [dispatch]);

  function navigate(val) {
    history.push(navItems[val].link);
  }

  return (
    <Hidden smUp>
      <BottomNavigation
        className={clsx("bottom-nav", classesHeader.navigation, classes.root, {
          [classesHeader.navigationShift]: sidebarOpen,
        })}
        value={activeTab}
        onChange={(e, val) => navigate(val)}
        showLabels
      >
        {navItems.map((item, i) => (
          <BottomNavigationAction
            key={item.name}
            label={item.name}
            icon={i === activeTab ? item.iconActive : item.icon}
          />
        ))}
      </BottomNavigation>
    </Hidden>
  );
}
