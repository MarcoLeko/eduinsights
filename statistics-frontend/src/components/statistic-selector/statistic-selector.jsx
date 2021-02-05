import React from "react";
import "./statistic-selector.scss";
import { Button, Card, CardActions, Chip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { PublicSharp } from "@material-ui/icons";
import { SwipeableCards } from "../swipeable-cards/swipeable-cards";

export function StatisticSelector({
  onStatisticClick,
  statisticsList,
  setSelectedStatistic,
}) {
  function onClick(statistic) {
    onStatisticClick({ statistic: statistic.key });
    setSelectedStatistic(statistic.key);
  }

  return (
    <SwipeableCards
      items={statisticsList.map((statistic) => (
        <Card className="statistic-selector">
          <CardContent>
            <Typography variant="h6" component="h2">
              {statistic.description}
            </Typography>
            <Typography>
              Year: {statistic.startYear}/{statistic.endYear}
            </Typography>
            <Chip
              color="secondary"
              component="p"
              className="chip-root"
              label={`${statistic.amountOfCountries} / 221 UNESCO Member`}
              avatar={<PublicSharp />}
            />
          </CardContent>
          <CardActions disableSpacing>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className="card-button"
              onClick={() => onClick(statistic)}
            >
              Select
            </Button>
          </CardActions>
        </Card>
      ))}
    />
  );
}
