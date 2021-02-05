import { Grid, MenuItem, Paper, TextField } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./filter-selector.scss";
import React, { useEffect, useState } from "react";

export function FilterSelector({
  filterStructure,
  queryParams,
  addNextQueryParam,
  fetchFilterStructure,
}) {
  const [isSelectionTriggered, setIsSelectionTriggered] = useState(false);

  useEffect(() => {
    if (isSelectionTriggered && queryParams) {
      fetchFilterStructure();
      setIsSelectionTriggered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  function handleChange(event, filterId) {
    setIsSelectionTriggered(true);
    addNextQueryParam({ [filterId]: event.target.value });
  }

  return (
    <Grid container wrap={"wrap"} justify={"center"}>
      {filterStructure.dimensions.observation.length
        ? filterStructure.dimensions.observation.map((filter) => (
            <Paper className="select" elevation={1} key={filter.id}>
              <TextField
                select
                InputLabelProps={{ shrink: true }}
                label={filter.name}
                fullWidth
                color="primary"
                value={queryParams[filter.id] || ""}
                onChange={(e) => handleChange(e, filter.id)}
                variant="outlined"
              >
                {filter.values
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Paper>
          ))
        : Array.from(Array(21).keys()).map((i) => (
            <Skeleton className="select skeleton" key={i} p={3} />
          ))}
    </Grid>
  );
}
