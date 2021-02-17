import React from "react";
import HistoryIcon from "@material-ui/icons/History";
import {
  Box,
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
import { useUiContext } from "../../hooks/use-ui-context";

function RecentQueriesContainer() {
  const { recentQueries } = useUiContext();

  return (
    <Container disableGutters>
      <Box mt={1} p={1} display={"flex"} alignItems={"center"}>
        <Typography variant="h5" color="secondary">
          History
        </Typography>
        <HistoryIcon
          fontSize={"large"}
          color={"secondary"}
          className="recent-queries-header-icon"
        />
      </Box>
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
            <Card key={`${item.uri}`} className="recent-query-card">
              <CardHeader
                title={item.description}
                titleTypographyProps={{ variant: "body1" }}
                className={"recent-query-card-spacing"}
              />
              <CardContent className={"recent-query-card-spacing"}>
                <Grid container justify={"space-between"} direction={"column"}>
                  <Typography variant={"body2"}>
                    Effected countries: {item.amountOfCountries}
                  </Typography>
                  <Typography variant={"body2"}>
                    Visualization: {item.uri.split("&visualization=")[1]}
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
                  onClick={() => window.location.assign(item.uri)}
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
