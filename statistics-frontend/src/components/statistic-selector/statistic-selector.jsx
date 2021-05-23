import React, { useCallback, useEffect, useState } from "react";
import "./statistic-selector.scss";
import { Button, Card, CardActions, Chip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { PublicSharp } from "@material-ui/icons";
import { SwipeableCards } from "../swipeable-cards/swipeable-cards";
import clsx from "clsx";
import { StatisticSelectorSkeleton } from "../loaders/skeletons/statistic-selector-skeleton/statistic-selector-skeleton";
import { getMapStatisticsList } from "../../helper/services";
import { receiveMessageInterceptor } from "../../context/alert-actions";
import { useAlertContext } from "../../hooks/use-alert-context";

function StatisticSelector({
  onStatisticClick,
  statisticsList = [],
  showDemo = false,
}) {
  const [list, setList] = useState(statisticsList);
  const { dispatch } = useAlertContext();

  const fetchInitialMapStatistics = useCallback(() => {
    getMapStatisticsList()
      .then((response) => {
        setList(response.statistics);
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!list.length) {
      fetchInitialMapStatistics();
    }
  }, [fetchInitialMapStatistics, list]);

  return Boolean(list.length) ? (
    <SwipeableCards
      items={list.map((statistic) => (
        <Card className="statistic-selector">
          <CardContent>
            <Typography variant="body1" color={"secondary"}>
              {statistic.description}
            </Typography>
            <Typography variant="body2" color={"secondary"}>
              Unit: {statistic.unit}
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
              className={clsx(
                "primary-button float-left",
                showDemo && "pulse-effect-primary"
              )}
              onClick={() => onStatisticClick(statistic)}
            >
              Select
            </Button>
          </CardActions>
        </Card>
      ))}
    />
  ) : (
    <StatisticSelectorSkeleton />
  );
}

export { StatisticSelector };
