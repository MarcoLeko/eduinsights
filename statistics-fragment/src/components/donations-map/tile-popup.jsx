import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import * as ReactLeaflet from "react-leaflet";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { DialogContent } from "@material-ui/core";

const { Popup } = ReactLeaflet;

const useStyles = makeStyles({
  container: { width: "100%" },
  media: {
    height: 140,
  },
  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    padding: 0,
    paddingTop: "0px !Important",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TilePopup({ open, setOpen }) {
  const classes = useStyles();

  function handleClose() {
    setOpen(false);
  }

  return (
    <Popup autoPan={false}>
      <Dialog
        hideBackdrop
        className={classes.dialog}
        open={open}
        PaperProps={{ elevation: 1 }}
        classes={{ container: classes.container }}
        maxWidth={"xs"}
        TransitionComponent={Transition}
        aria-describedby="modal-description"
        onClose={handleClose.bind(this)}
      >
        <DialogContent classes={{ root: classes.root }}>
          <Card className={classes.card} id="modal-description">
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
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
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
        </DialogContent>
      </Dialog>
    </Popup>
  );
}

export default TilePopup;
