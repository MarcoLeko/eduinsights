import * as React from "react";
import { Hidden, Toolbar } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import googlePlay from "../../assets/google-play.png";
import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 48,
    display: "flex",
    alignItems: "center",
    padding: "0 4px",
  },
  logoPanel: {
    alignItems: "center",
    flex: 1,
    display: "flex",
    textDecoration: "none",
  },
  logo: {
    height: 48,
    width: 48,
    marginRight: theme.spacing(1),
  },
  divider: {
    height: 30,
    margin: 4,
    width: 2,
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0, 1),
    },
  },
}));

function ToggleableMenu({ isOpen, toggle }) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Link to="/" className={classes.logoPanel}>
        <Logo className={classes.logo} />
        <Typography variant={"h6"} color="primary">
          Eduinsights
        </Typography>
      </Link>
      <div className={classes.actionButtons}>
        <Hidden xsDown>
          <img src={googlePlay} height={40} alt="Get it on google play" />
        </Hidden>
        <IconButton onClick={toggle.bind(this, !isOpen)}>
          {isOpen ? <ChevronRightIcon /> : <MoreVertical />}
        </IconButton>
      </div>
    </Toolbar>
  );
}

export default ToggleableMenu;
