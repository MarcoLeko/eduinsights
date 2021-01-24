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
    categoriesList,
    selectedCategory,
    setSelectedCategory,
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

  function handleChange(event) {
    setSelectedCategory(event.target.value);
  }

  useEffect(() => {
    dispatch(setActiveTab(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesList]);

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
        {categoriesList.length ? (
          <TextField
            select
            className="select"
            label="Category"
            value={selectedCategory}
            onChange={handleChange}
            helperText="Please select your category"
            variant="outlined"
          >
            {categoriesList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Skeleton className="select skeleton" />
        )}
      </div>
    </Container>
  );
}
