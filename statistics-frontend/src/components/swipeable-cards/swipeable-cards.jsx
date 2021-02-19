import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { animated, interpolate, useSpring } from "react-spring";
import { Card, MobileStepper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./swipeable-cards.scss";

export function SwipeableCards({ items }) {
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

  return Boolean(items.length) ? (
    <div className="swipeable-cards-container">
      <SwipeableViews
        index={index}
        className="react-swipeable-views"
        onChangeIndex={handleChangeIndex}
        onSwitching={handleSwitch}
        enableMouseEvents
      >
        {items.map((item, currentIndex) => {
          function interpolatePositionProps(range, output) {
            return props.position.interpolate({
              range,
              output,
            });
          }

          const inputRange = items.map((_, i) => i);
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
              <Card>{item}</Card>
            </animated.div>
          );
        })}
      </SwipeableViews>
      <MobileStepper
        variant="dots"
        steps={items.length}
        position="static"
        activeStep={index}
        className="card-dot"
      />
    </div>
  ) : (
    <div className="skeleton-container">
      <Skeleton variant="rect" className="skeleton-rect" />
      <div className="skeleton-dots-flex">
        {Array.from(new Array(8).fill(1)).map((v, i) => (
          <Skeleton key={v + i} variant="circle" className="skeleton-dot" />
        ))}
      </div>
    </div>
  );
}
