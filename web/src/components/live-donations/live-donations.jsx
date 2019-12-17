import React, {memo, useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import useLiveDonationsStyling from "./live-donations.styling";
import SkeletonCard from "./skeleton-card";

function LiveDonations() {
    const classes = useLiveDonationsStyling();

    const [loading, setLoading] = useState(true);
    const lastDonations = new Array(3).fill((Math.random() * 50).toFixed(2));
    const allDonations = new Array(6).fill(Math.random());

    useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    }, []);

    return (
            loading ? <SkeletonCard/> :
                <Box p={3}>
                    {
                        allDonations.map((v, i) =>
                            <Card className={classes.card} key={i}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            alt="Ted talk"
                                            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                        />
                                    }
                                    title={'Ted'}
                                    subheader={'5 hours ago'}
                                />
                                <CardMedia
                                    className={classes.media}
                                    title={"charity-picture"}
                                    image={
                                        "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                                    }
                                />
                                <CardContent className={classes.content}>
                                    <Typography
                                        className={"MuiTypography--heading"}
                                        variant={"h6"}
                                        gutterBottom
                                    >
                                        Nature Around Us
                                    </Typography>
                                    <Typography
                                        className={"MuiTypography--subheading"}
                                        variant={"caption"}
                                    >
                                        We are going to learn different kinds of species in nature that live
                                        together to form amazing environment.
                                    </Typography>
                                    <Divider className={classes.divider} light/>
                                    <Typography
                                        variant={"subtitle1"}
                                        gutterBottom
                                    >
                                        Last Donations
                                    </Typography>
                                    {lastDonations.map((val, i) => (
                                        <Chip
                                            className={classes.chip}
                                            label={`${val} $`}
                                            key={i}
                                            color="secondary"/>
                                    ))
                                    }
                                </CardContent>
                            </Card>
                        )}
                </Box>
    );
}

export default memo(LiveDonations);