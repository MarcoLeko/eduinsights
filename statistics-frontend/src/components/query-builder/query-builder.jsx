import clsx from "clsx";
import { Container, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useUiContext } from "../../hooks/use-ui-context";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import "./query-builder.scss";
import StatisticStepperQueryBuilder from "../statistic-stepper-query-builder/statistic-stepper-query-builder";
import { useQueryBuilder } from "../../hooks/use-query-builder";
import { FilterSelector } from "../filter-selector/filter-selector";

export function QueryBuilder() {
  const { sidebarOpen, dispatch } = useUiContext();
  const {
    filterStructure,
    selectedFilterStructure,
    setSelectedFilterStructure,
    isFilterValid,
  } = useQueryBuilder();

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

  useEffect(() => {
    dispatch(setActiveTab(1));
  }, [filterStructure, dispatch]);

  return (
    <Container
      disableGutters
      onClick={closeSidebar}
      className={clsx("content", sidebarOpen && "content-shift")}
    >
      <div className="text-box">
        <Typography variant="h4" color="textSecondary">
          Build your own queries (Beta)
        </Typography>
        <Typography variant="body1" color="textSecondary">
          This feature heavily relies on the UIS API. Since UIS is during a
          migration phase, this feature might not work. In addition multi
          dimension observations are currently not supported. E.g. an
          observation between 2017 and 2018 is already multi-dimensional.
        </Typography>
      </div>
      <StatisticStepperQueryBuilder isFilterValid={isFilterValid} />
      <FilterSelector
        selectedFilterStructure={selectedFilterStructure}
        setSelectedFilterStructure={setSelectedFilterStructure}
        filterStructure={filterStructure}
      />
    </Container>
  );
}
