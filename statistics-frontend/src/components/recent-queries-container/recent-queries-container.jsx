import React from "react";
import { useLocalStorageQueryHistory } from "../../hooks/use-local-storage-query-history";
import HistoryIcon from "@material-ui/icons/History";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import "./recent-queries-container.scss";
import "../statistic-selector/statistic-selector.scss";

function RecentQueriesContainer() {
  const { recentQueries } = useLocalStorageQueryHistory();

  console.log(recentQueries);
  return (
    <Container disableGutters>
      <HistoryIcon
        fontSize={"large"}
        color={"secondary"}
        className="mb-1 mt-2"
      />
      <Grid
        container
        alignItems={"center"}
        direction={"row"}
        wrap={"nowrap"}
        justify={recentQueries.length ? "flex-start" : "center"}
        className="recent-queries-container"
      >
        {recentQueries.length ? (
          recentQueries.map((item) => (
            <Card key={`${item.params}`} className="recent-query-card">
              <CardHeader
                title={item.description}
                titleTypographyProps={{ variant: "body1" }}
              />
              <CardContent>
                <Grid container justify={"space-between"} direction={"column"}>
                  <Typography variant={"body2"}>
                    Effected countries: {item.amountOfCountries}
                  </Typography>
                  <Typography variant={"body2"}>
                    Mode: {item.params.split("&visualization=")[1]}
                  </Typography>
                  <Typography variant={"body2"}>Unit: {item.unit}</Typography>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  className="card-button"
                  onClick={() => window.location.assign(item.params)}
                >
                  Select
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography
            variant={"subtitle2"}
            color={"secondary"}
            align={"center"}
            mt={2}
          >
            No recent queries available
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export { RecentQueriesContainer };
