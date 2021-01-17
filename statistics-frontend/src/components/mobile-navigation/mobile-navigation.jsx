import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
} from "@material-ui/core";
import "./mobile-navgation.scss";
import { navItems } from "../shared/navItems";
import { useUiContext } from "../../hooks/use-ui-context";
import { useHistory } from "react-router-dom";

export function MobileNavigation() {
  const history = useHistory();
  const { activeTab } = useUiContext();

  const [index, onChange] = useState(activeTab);

  function navigate(val) {
    onChange(val);
    history.push(navItems[val].link);
  }

  return (
    <Hidden smUp>
      <BottomNavigation
        className="bottom-nav"
        value={index}
        onChange={(e, val) => navigate(val)}
        showLabels
      >
        {navItems.map((item, i) => (
          <BottomNavigationAction
            label={item.name}
            icon={i === index ? item.iconActive : item.icon}
          />
        ))}
      </BottomNavigation>
    </Hidden>
  );
}
