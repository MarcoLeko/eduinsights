import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as ReactLeaflet from 'react-leaflet';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

const {Popup} = ReactLeaflet;

const useStyles = makeStyles({
    card: {
        maxWidth: 350,
        maxHeight: 550,
        width: '90%',
    },
    media: {
        height: 140,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

function MarkerPopup({open, setOpen}) {
    const classes = useStyles();

    function handleClose() {
        setOpen(false);
    }

    return (
        <Popup
            autoPan={false}
        >
            <Modal
                className={classes.modal}
                open={open}
                classes={{root: classes.root}}
                onClose={handleClose.bind(this)}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 0,
                    invisible: true
                }}
            >
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
            </Modal>
        </Popup>
    );
}

export default MarkerPopup;
