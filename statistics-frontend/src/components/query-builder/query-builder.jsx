import clsx from "clsx";
import { Container, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useHeaderStyles } from "../shared/header-styles";
import { useUiContext } from "../../hooks/use-ui-context";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import "./query-builder.scss";
import { Ads } from "../ads/ads";

export function QueryBuilder() {
  const classes = useHeaderStyles();
  const { sidebarOpen, dispatch } = useUiContext();

  useEffect(() => {
    dispatch(setActiveTab(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchSidebarState = useCallback(
    function (args) {
      dispatch(setSidebarOpen(args));
    },
    [dispatch]
  );

  function closeSidebar() {
    if (sidebarOpen) {
      dispatchSidebarState(false);
    }
  }

  return (
    <Container
      disableGutters
      onClick={closeSidebar}
      className={clsx("container", classes.content, {
        [classes.contentShift]: sidebarOpen,
      })}
    >
      <Ads />
      <Typography variant="h4" color="textSecondary" className="headline">
        Beta
      </Typography>
    </Container>
  );
}
