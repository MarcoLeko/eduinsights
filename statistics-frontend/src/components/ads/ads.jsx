import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { InfoOutlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { Adsense } from "@ctrl/react-adsense";
import { useDetectAdBlock } from "../../hooks/useDetectAdBlock";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: theme.spacing(2, "auto", 0, "auto"),
    maxWidth: 1200,
  },
  cardHeaderRoot: {
    flexDirection: "row-reverse",
    padding: theme.spacing(1),
  },
  cardHeaderAction: {
    margin: 0,
  },
}));

export function Ads() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const adBlockDetected = useDetectAdBlock();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return !adBlockDetected ? (
    <>
      <Card classes={{ root: classes.cardRoot }}>
        <CardHeader
          classes={{
            root: classes.cardHeaderRoot,
            action: classes.cardHeaderAction,
          }}
          onClick={handleClickOpen}
          action={
            <IconButton aria-label="info">
              <InfoOutlined />
            </IconButton>
          }
          subheader={"Why am I seeing ads?"}
        />
        <CardMedia
          children={
            <Adsense
              client="ca-pub-4995540870576035"
              style={{ display: "block", width: "100%" }}
              layout="in-article"
              format="fluid"
            />
          }
        />
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Google's ads service</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            This site has costs on hardware and on maintenance level which need
            to be covered. Therefore Eduinsights decided to place a google ads
            snippet to partially compensate those. Please take this into
            consideration, when you might see pop up one of those 'annoying'
            ads.{" "}
            <span role="img" aria-labelledby="hands-up">
              🙌
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : null;
}
