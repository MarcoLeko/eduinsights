import * as React from 'react';
import {Box} from '@material-ui/core';
import {useEffect, useRef, useState} from 'react';
import CountUp from 'react-countup';

export default function DonationOverview(): React.ReactNode {

    return (
        <Box p={3}>
            <CountUp
                start={0}
                end={160527.012}
                duration={5}
                separator=" "
                decimals={2}
                decimal=","
                suffix=" $ donated"
                onEnd={() => console.log('Ended! 👏')}
                onStart={() => console.log('Started! 💨')}
            />
        </Box>
    );
}

const useIntersect = ({root = null, rootMargin, threshold = 0}) => {
    const [entry, updateEntry] = useState({});
    const [node, setNode] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = useRef(new window.IntersectionObserver(([entry]) => updateEntry(entry), {
            root,
            rootMargin,
            threshold
        }));
        const {current: currentObserver} = observer;

        currentObserver.disconnect();

        if(node) {
            currentObserver.observe(node);
        }

        return () => currentObserver.disconnect();
    }, [node, root, rootMargin, threshold]);

    return [setNode, entry];
}
