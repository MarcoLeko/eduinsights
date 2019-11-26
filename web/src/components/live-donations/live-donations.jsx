import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 450,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 20px -12px rgba(0,0,0,0.3)",
        marginBottom: theme.spacing(2),
        "&:hover": {
            boxShadow: "0 12px 40px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: theme.spacing(3)
    },
    divider: {
        margin: theme.spacing(3, 0)
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    chip: {
        "&:not(:first-of-type)": {
            marginLeft: theme.spacing(1)
        }
    }
}));

function LiveDonations() {
    const classes = useStyles();

    const lastDonations = new Array(3).fill((Math.random() * 50).toFixed(2));
    const allDonations =  new Array(6).fill(Math.random());
    console.log(lastDonations);
    return (
        <Box p={3}>
            {
                allDonations.map((v, i) =>
                    <Card className={classes.card} key={i}>
                        <CardMedia
                            className={classes.media}
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
                            ))}
                        </CardContent>
                    </Card>
                )}
        </Box>
    );
}

export default memo(LiveDonations)