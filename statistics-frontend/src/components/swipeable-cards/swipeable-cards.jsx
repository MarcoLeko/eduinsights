import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { animated, interpolate, useSpring } from "react-spring";
import { Card, MobileStepper } from "@material-ui/core";
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

  return (
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
              style={{
                transform: scaleAndTranslateX,
              }}
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
        className="mt-2 mobile-stepper"
      />
    </div>
  );
}
