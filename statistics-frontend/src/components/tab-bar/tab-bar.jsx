import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useUiContext } from "../../hooks/use-ui-context";
import { useHistory } from "react-router-dom";
import { navItems } from "../shared/navItems";
import "./tab-bar.scss";
import { Chip } from "@material-ui/core";

function TabBar() {
  const history = useHistory();
  const { activeTab } = useUiContext();

  function navigate(val) {
    history.push(navItems[val].link);
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
      {navItems.map(({ name, link }, i) => (
        <Tab
          key={name}
          selected={i === activeTab}
          className="tab"
          label={
            <>
              <div>{name}</div>
              {name === "Query builder" ? (
                <Chip
                  color={"primary"}
                  label="Beta"
                  size="small"
                  className="chip"
                />
              ) : null}
            </>
          }
          disableRipple
        />
      ))}
    </Tabs>
  );
}

export default TabBar;
