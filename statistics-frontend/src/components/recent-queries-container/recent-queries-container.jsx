import React from "react";
import { useLocalStorageQueryHistory } from "../../hooks/use-local-storage";
import { Grid, Typography } from "@material-ui/core";
import "./recent-queries-container.scss";

function RecentQueriesContainer() {
  const [recentQueries] = useLocalStorageQueryHistory();

  return (
    <Grid container alignItems={"center"} className="container">
      <Typography
        variant={"subtitle2"}
        color={"secondary"}
        align={"center"}
        mt={2}
      >
        Recent queries are {recentQueries.length ? "available" : "unavailable"}
      </Typography>
    </Grid>
  );
}

export { RecentQueriesContainer };
