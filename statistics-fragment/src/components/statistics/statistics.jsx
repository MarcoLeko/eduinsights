import React, {memo, useEffect, useState} from 'react';
import SkeletonCharts from "./skeleton-charts";

function Statistics() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    }, []);

    return (
            loading ? <SkeletonCharts/> : <div>Coming soon</div>

    );
}

export default memo(Statistics);
