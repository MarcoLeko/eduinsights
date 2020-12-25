import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { animated, interpolate, useSpring } from "react-spring";
import { makeStyles } from "@material-ui/core/styles";
import "./statistic-selector.scss";
import { Button, Card, CardActions } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useStatistics } from "../../hooks/use-statistics";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("ccSmallest")]: {
      padding: "0px 14px",
    },
    [theme.breakpoints.up("ccXxxs")]: {
      padding: "0px 30px",
    },
    [theme.breakpoints.up("ccXxs")]: {
      padding: "0px 60px",
    },
    [theme.breakpoints.up("ccXs")]: {
      padding: "0px 100px",
    },
    [theme.breakpoints.up("ccSm")]: {
      padding: "0px 130px",
    },
    [theme.breakpoints.up("ccMd")]: {
      padding: "0px 180px",
    },
  },
  container: {
    padding: theme.spacing(2),
    borderRadius: 4,
    justifyContent: "center",
    margin: "auto",
  },
  slide: {
    padding: theme.spacing(3, 2),
    color: theme.palette.text.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
  cardRoot: {
    padding: theme.spacing(0, 1),
    minWidth: 250,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  cardButton: {
    marginLeft: "auto",
  },
}));

export function StatisticSelector() {
  const classes = useStyles();
  const { statisticsList } = useStatistics();
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
      return;
    }
    props.position.setValue(index);
  }

  return (
    <div className={classes.container}>
      <SwipeableViews
        index={index}
        className={classes.root}
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
          ).interpolate((x) => `scale(${x})`);

          const opacity = interpolatePositionProps(
            inputRange,
            inputRange.map((i) => (currentIndex === i ? 1 : 0.5))
          );

          const translateX = interpolatePositionProps(
            inputRange,
            inputRange.map((i) => (100 / 2) * (i - currentIndex))
          ).interpolate((x) => `translateX(${x}px)`);

          const scaleAndTranslateX = interpolate(
            [scale, translateX],
            (scale, translateX) => `${scale} ${translateX}`
          );
          return (
            <animated.div
              key={String(currentIndex)}
              className={classes.slide}
              style={Object.assign({
                opacity,
                transform: scaleAndTranslateX,
              })}
            >
              <Card className={classes.cardRoot}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {statistic.description}
                  </Typography>
                  <Typography className={classes.pos}>Year:</Typography>
                  <Typography variant="body2" component="p">
                    Start: {statistic.startYear}
                    <br />
                    End: {statistic.endYear}
                  </Typography>
                  <Typography className={classes.title} gutterBottom>
                    This statistic provides data for 189 / 193 Countries
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    classes={{ root: classes.cardButton }}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </animated.div>
          );
        })}
      </SwipeableViews>
    </div>
  );
}
