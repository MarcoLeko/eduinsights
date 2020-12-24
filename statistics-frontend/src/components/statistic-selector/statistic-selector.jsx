import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { animated } from "react-spring";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    padding: "0 50px",
  },
  slide: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    color: theme.palette.text.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
  img: {
    width: 180,
    height: 180,
    display: "block",
    marginBottom: theme.spacing(3),
  },
}));

const albums = [
  {
    name: "Abbey Road",
    src: "https://picsum.photos/200/300",
  },
  {
    name: "Bat Out of Hell",
    src: "https://picsum.photos/200/300",
  },
  {
    name: "Homogenic",
    src: "https://picsum.photos/200/300",
  },
  {
    name: "Number of the Beast",
    src: "https://picsum.photos/200/300",
  },
  {
    name: "It's Blitz",
    src: "https://picsum.photos/200/300",
  },
  {
    name: "The Man-Machine",
    src: "https://picsum.photos/200/300",
  },
];

export function StatisticSelector() {
  const [selectedStatistic, setSelectedStatistic] = useState({
    index: 0,
  });
  const classes = useStyles();
  const handleChangeIndex = (index) => {
    setSelectedStatistic({ ...selectedStatistic, index });
  };

  const handleSwitch = (index, type) => {
    if (type === "end") {
      return;
    }
    setSelectedStatistic({
      ...selectedStatistic,
    });
  };

  return (
    <SwipeableViews
      index={selectedStatistic.index}
      className={classes.root}
      onChangeIndex={handleChangeIndex}
      onSwitching={handleSwitch}
    >
      {albums.map((album, currentIndex) => (
        <animated.div key={String(currentIndex)} className={classes.slide}>
          <img className={classes.img} src={album.src} alt="cover" />
          {album.name}
        </animated.div>
      ))}
    </SwipeableViews>
  );
}
