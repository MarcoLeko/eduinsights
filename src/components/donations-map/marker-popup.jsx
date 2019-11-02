import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as ReactLeaflet from 'react-leaflet';

const {Popup} = ReactLeaflet;

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


export default function MarkerPopup() {
    const classes = useStyles();

    return (
        <Popup>
            <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Details
                    </Button>
                    <Button size="small" color="primary">
                        Donate
                    </Button>
                </CardActions>
            </Card>
        </Popup>
    );
}
