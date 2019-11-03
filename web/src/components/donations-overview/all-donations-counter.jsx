import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { useEffect, useRef } from "react";
import CountUp from "react-countup";

export default function AllDonationsCounter({ canCount }) {
  let ref = useRef(null);
  let globStartFunc;

  const observer = useRef(
    new IntersectionObserver(([entry]) => updateEntry(entry), {
      threshold: .5
    })
  );

  function updateEntry({ isIntersecting }) {
    if (isIntersecting) {
      globStartFunc();
      observer.current.disconnect();
    }
  }

  useEffect(() => {
    if (canCount) {
      const { current: currentObserver } = observer;
      currentObserver.disconnect();

      const node = ref.containerRef.current;
      if (node) {
        currentObserver.observe(node);
      }

      return () => currentObserver.disconnect();
    }
  }, [canCount]);

  return (
    <React.Fragment>
      <Typography variant="h6" align="center">
        We already collected
      </Typography>
      <div className="summed-donations-panel">
        <CountUp
          start={0}
          end={160527.12}
          duration={5}
          separator={" "}
          decimals={2}
          suffix={" $"}
          ref={curr => ref = curr}
        >
          {({ countUpRef, start }) => {
            globStartFunc = start;
            return (
              <React.Fragment>
                    <span
                      className="counting-numbers"
                      ref={countUpRef}
                    />
              </React.Fragment>
            );
          }}
        </CountUp>
      </div>
      <Typography variant="h6" align="center">
        Thanks to all donor.
      </Typography>
    </React.Fragment>
  )
}
