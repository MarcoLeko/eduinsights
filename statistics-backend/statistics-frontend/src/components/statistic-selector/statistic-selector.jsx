import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { animated, interpolate, useSpring } from "react-spring";
import "./statistic-selector.scss";
import {
  Button,
  Card,
  CardActions,
  Chip,
  MobileStepper,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { StatisticsListMarkup } from "../SEO/statistics-list-markup";
import { PublicSharp } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

export function StatisticSelector({
  onStatisticClick,
  statisticsList,
  setSelectedStatistic,
}) {
  const [index, setIndex] = useState(0);
  const [props, start] = useSpring(() => ({
    from: { position: 0 },
  }));

  function handleChangeIndex(indexNum) {
    setIndex(indexNum);
  }

  function handleSwitch(index, type) {
    if (type === "end") {
      start({
        from: { position: props.position.value },
        to: { position: Math.round(index) },
      });
    }
    props.position.setValue(index);
  }

  return Boolean(statisticsList.length) ? (
    <div className="statistic-selector-container">
      <StatisticsListMarkup statisticsList={statisticsList} />
      <SwipeableViews
        index={index}
        className="react-swipeable-views"
        onChangeIndex={handleChangeIndex}
        onSwitching={handleSwitch}
        enableMouseEvents
      >
        {statisticsList.map((statistic, currentIndex) => {
          function interpolatePositionProps(range, output) {
            return props.position.interpolate({
              range,
              output,
            });
          }

          const inputRange = statisticsList.map((_, i) => i);
          const scale = interpolatePositionProps(
            inputRange,
            inputRange.map((i) => (currentIndex === i ? 1 : 0.75))
          );

          const opacity = interpolatePositionProps(
            inputRange,
            inputRange.map((i) => (currentIndex === i ? 1 : 0.5))
          );

          const translateX = interpolatePositionProps(
            inputRange,
            inputRange.map((i) => (100 / 2) * (i - currentIndex))
          );

          const scaleAndTranslateX = interpolate(
            [
              scale.interpolate((x) => `scale(${x})`),
              translateX.interpolate((x) => `translateX(${x}px)`),
            ],
            (scale, translateX) => `${scale} ${translateX}`
          );

          return (
            <animated.div
              key={String(currentIndex)}
              className="slider"
              style={Object.assign({
                opacity,
                transform: scaleAndTranslateX,
              })}
            >
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
                    onClick={() => {
                      onStatisticClick({ statistic: statistic.key });
                      setSelectedStatistic(statistic.key);
                    }}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </animated.div>
          );
        })}
      </SwipeableViews>
      <MobileStepper
        variant="dots"
        steps={statisticsList.length}
        position="static"
        activeStep={index}
      />
    </div>
  ) : (
    <div className="skeleton-container">
      {Array.from(new Array(5).fill(1)).map((v, i) => (
        <Skeleton key={v + i} variant="rect" className="skeleton-root" />
      ))}
    </div>
  );
}
