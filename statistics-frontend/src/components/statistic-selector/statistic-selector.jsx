import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { animated, interpolate, useSpring } from "react-spring";
import { makeStyles } from "@material-ui/core/styles";
import "./statistic-selector.scss";
import { Button, Card, CardActions, Chip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useStatisticData } from "../../hooks/use-statistic-data";
import { muiGradientBackground } from "../../material-ui-theme";
import { StatisticsListMarkup } from "../SEO/statistics-list-markup";
import { PublicSharp } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

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
    [theme.breakpoints.up("ccLg")]: {
      padding: "0px 260px",
    },
    [theme.breakpoints.up("ccXl")]: {
      padding: "0px 400px",
    },
  },
  container: {
    padding: theme.spacing(0, 2),
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
    background: muiGradientBackground,
    color: theme.palette.primary.contrastText,
  },
  cardButton: {
    marginLeft: "auto",
  },
  chipAvatarColorSecondary: {
    background: "none !important",
  },
  chipRoot: { margin: 0 },
  skeletonContainer: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  skeletonRoot: {
    margin: theme.spacing(2, 3),
    flexShrink: 0,
    height: 175,
    width: 150,
    [theme.breakpoints.up("ccSmallest")]: {
      width: 175,
    },
    [theme.breakpoints.up("ccXxxs")]: {
      width: 250,
    },
    [theme.breakpoints.up("ccSm")]: {
      width: 300,
    },
  },
}));

export function StatisticSelector({ onStatisticClick }) {
  const classes = useStyles();
  const { statisticsList } = useStatisticData();
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

  return (
    <>
      {Boolean(statisticsList.length) ? (
        <div className={classes.container}>
          <StatisticsListMarkup statisticsList={statisticsList} />
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
                      <Typography variant="body1" component="span">
                        Start: {statistic.startYear} - End: {statistic.endYear}
                      </Typography>
                      <Typography variant="overline" component="div">
                        This statistic provides data for{" "}
                        <Chip
                          color="secondary"
                          component="p"
                          classes={{
                            root: classes.chipRoot,
                            avatarColorSecondary:
                              classes.chipAvatarColorSecondary,
                          }}
                          label={`${statistic.amountOfCountries} / 221 UNESCO-Members`}
                          avatar={<PublicSharp />}
                        ></Chip>
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        classes={{ root: classes.cardButton }}
                        onClick={() =>
                          onStatisticClick({ statistic: statistic.key })
                        }
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
      ) : (
        <div className={classes.skeletonContainer}>
          {Array.from(new Array(5)).map((undefined, index) => (
            <Skeleton
              key={index}
              variant="rect"
              classes={{ root: classes.skeletonRoot }}
            />
          ))}
        </div>
      )}
    </>
  );
}
