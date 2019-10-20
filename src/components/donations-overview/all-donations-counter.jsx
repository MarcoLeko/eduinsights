import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {useEffect, useRef} from "react";
import {useCountUp} from "react-countup";

export default function AllDonationsCounter({canCount}) {
    const ref = useRef(null);

    const {countUp, start, pauseResume, reset} = useCountUp({
        start: 0,
        end: 160527.12,
        duration: 5,
        separator: " ",
        decimals: 2,
        suffix: " $",
        onEnd: () => console.log('Ended! 👏'),
        onPauseResume: () => console.log('Paused!'),
        onStart: () => console.log('Started! 💨')
    });


    const observer = useRef(
        new IntersectionObserver(([entry]) => updateEntry(entry), {
            threshold: .5
        })
    );

    function updateEntry({isIntersecting}) {
        if (isIntersecting) {
            start();
            observer.current.disconnect();
        }
    }

    useEffect(() => {
        if (canCount) {
            const {current: currentObserver} = observer;
            currentObserver.disconnect();

            const node = ref.current;
            if (node) currentObserver.observe(node);

            return () => currentObserver.disconnect();
        }
        reset();
        pauseResume();
    }, [canCount]);

    return (
        <React.Fragment>
            <Typography variant="h6" align="center">
                We already collected
            </Typography>
            <div className="summed-donations-panel">
                <div className="counting-numbers" ref={ref}>{countUp}</div>
            </div>
            <Typography variant="h6" align="center">
                Thanks to every anonymous donor.
            </Typography>
        </React.Fragment>
    )
}
