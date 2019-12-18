import useLiveDonationsStyling from "./live-donations.styling";
import React from 'react';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Skeleton from "@material-ui/lab/Skeleton";
import CardContent from "@material-ui/core/CardContent";

export default function SkeletonCard() {
    const classes = useLiveDonationsStyling();

    return (
        <Box p={3}>
            {
                new Array(4).fill(null).map((v, i) =>
                    <Card className={classes.card} key={i}>
                        <CardHeader
                            avatar={
                                <Skeleton variant="circle" width={40} height={40}/>
                            }
                            title={<Skeleton height={10} width="80%" style={{marginBottom: 6}}/>}
                            subheader={<Skeleton height={10} width="40%"/>}
                        />
                        <Skeleton variant="rect" className={classes.media}/>
                        <CardContent className={classes.content}>
                            <Skeleton height={10} style={{marginBottom: 6}}/>
                            <Skeleton height={10} width="80%"/>
                        </CardContent>
                    </Card>
                )}
        </Box>
    );
}