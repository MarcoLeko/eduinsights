import React from 'react';
import Box from "@material-ui/core/Box";

export default function SkeletonCharts() {

    return (
        <Box p={3}>
            {
                new Array(4).fill(null).map((v, i) =>
                    <Box key={i} />
                )}
        </Box>
    );
}