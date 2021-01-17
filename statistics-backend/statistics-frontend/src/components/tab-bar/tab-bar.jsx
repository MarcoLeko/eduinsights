import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useUiContext } from "../../hooks/use-ui-context";
import { useHistory } from "react-router-dom";
import { navItems } from "../shared/navItems";
import "./tab-bar.scss";

function TabBar() {
  const history = useHistory();
  const { activeTab } = useUiContext();

  const [index, onChange] = useState(activeTab);

  function navigate(val) {
    onChange(val);
    history.push(navItems[val].link);
  }

  return (
    <Tabs
      variant={"fullWidth"}
      centered
      className="tabs"
      value={index}
      indicatorColor="primary"
      onChange={(e, val) => navigate(val)}
    >
      {navItems.map(({ name, link }, i) => (
        <Tab
          key={name}
          selected={i === activeTab}
          className="tab"
          label={name}
          disableRipple
        />
      ))}
    </Tabs>
  );
}

export default TabBar;
