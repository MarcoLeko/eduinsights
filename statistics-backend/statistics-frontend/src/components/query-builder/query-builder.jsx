import clsx from "clsx";
import { Container, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useHeaderStyles } from "../shared/header-styles";
import { useUiContext } from "../../hooks/use-ui-context";
import { setSidebarOpen } from "../../context/ui-actions";
import "./query-builder.scss";

export function QueryBuilder() {
  const classes = useHeaderStyles();
  const { sidebarOpen, dispatch } = useUiContext();

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
      <Typography variant="h4">Beta</Typography>
    </Container>
  );
}
