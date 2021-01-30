import { Grid, MenuItem, TextField } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./filter-selector.scss";
import React from "react";

export function FilterSelector({
  filterStructure,
  queryParams,
  addNextQueryParam,
}) {
  function handleChange(event, filterId) {
    addNextQueryParam({ [filterId]: event.target.value });
  }

  return (
    <Grid container wrap={"wrap"} justify={"center"}>
      {filterStructure.length
        ? filterStructure.map((filter, i) => (
            <TextField
              select
              key={filter.id + i}
              className="select"
              InputLabelProps={{ shrink: true }}
              label={filter.name}
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
          ))
        : Array.from(Array(21).keys()).map((i) => (
            <Skeleton className="select skeleton" key={i} p={3} />
          ))}
    </Grid>
  );
}
