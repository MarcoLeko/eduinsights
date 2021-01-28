import clsx from "clsx";
import { Container, MenuItem, TextField, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useUiContext } from "../../hooks/use-ui-context";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import "./query-builder.scss";
import StatisticStepperQueryBuilder from "../statistic-stepper-query-builder/statistic-stepper-query-builder";
import { useQueryBuilder } from "../../hooks/use-query-builder";
import { Skeleton } from "@material-ui/lab";

export function QueryBuilder() {
  const { sidebarOpen, dispatch } = useUiContext();
  const {
    filterStructure,
    selectedFilterStructure,
    setSelectedFilterStructure,
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

  function handleChange(event, filterId) {
    setSelectedFilterStructure(
      selectedFilterStructure.map((filterElm) =>
        filterElm.hasOwnProperty(filterId)
          ? { [filterId]: event.target.value }
          : filterElm
      )
    );
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
      <StatisticStepperQueryBuilder />
      <div className="text-field-container">
        {filterStructure.length
          ? filterStructure.map((filter, i) => (
              <TextField
                select
                key={filter.id + i}
                className="select"
                InputLabelProps={{ shrink: true }}
                label={filter.name}
                value={selectedFilterStructure[i][filter.id]}
                onChange={(e) => handleChange(e, filter.id)}
                variant="outlined"
              >
                {filter.items.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            ))
          : Array.from(Array(22).keys()).map((i) => (
              <Skeleton className="select skeleton" key={i} />
            ))}
      </div>
    </Container>
  );
}
