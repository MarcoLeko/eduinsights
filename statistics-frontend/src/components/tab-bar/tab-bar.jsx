import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useUiContext } from "../../hooks/use-ui-context";
import { useHistory } from "react-router-dom";
import "./tab-bar.scss";
import { navigationItems } from "../shared/navigation-items";

function TabBar() {
  const history = useHistory();
  const { activeTab } = useUiContext();

  function navigate(val) {
    history.push(navigationItems[val].link);
  }

  return (
    <Tabs
      variant={"fullWidth"}
      centered
      className="tabs"
      value={activeTab}
      TabIndicatorProps={{
        className: "indicator",
      }}
      indicatorColor="primary"
      onChange={(e, val) => navigate(val)}
    >
      {navigationItems.map(({ name, link }, i) => (
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
