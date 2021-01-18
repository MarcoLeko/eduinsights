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
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { InfoOutlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import AdSense from "react-adsense";
import "./ads.scss";

// TODO: Add as soon as app is allowed to use ads
export function Ads() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className="ad-paper">
        <CardHeader
          className="card-header"
          onClick={handleClickOpen}
          action={
            <IconButton aria-label="info">
              <InfoOutlined />
            </IconButton>
          }
          subheader={"Why we are showing ads?"}
        />
        <CardMedia
          children={
            <AdSense.Google
              client="ca-pub-4995540870576035"
              slot="7806394673"
              format="auto"
              responsive="true"
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
