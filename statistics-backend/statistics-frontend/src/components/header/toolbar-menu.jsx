import * as React from "react";
import { Hidden, List, Toolbar } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { name as projectName } from "../../../package.json";
import { ThemeSelector } from "../shared/theme-selector";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 52,
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
    height: 40,
    width: 40,
    marginRight: theme.spacing(1),
  },
  divider: {
    height: 30,
    margin: 4,
    width: 2,
  },
  header: { fontWeight: 300 },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0, 1),
    },
  },
}));

function ToolbarMenu({ isOpen, toggle }) {
  const classes = useStyles();

  function toggleByButtonClick() {
    toggle(!isOpen);
  }

  return (
    <Toolbar className={classes.root}>
      <Link to="/" className={classes.logoPanel}>
        <Logo className={classes.logo} />
        <Typography
          variant={"h4"}
          color="secondary"
          classes={{ root: classes.header }}
        >
          {projectName}
        </Typography>
      </Link>
      <div className={classes.actionButtons}>
        <Hidden xsDown>
          <List>
            <ThemeSelector />
          </List>
        </Hidden>
        <Hidden smUp>
          <IconButton onClick={toggleByButtonClick}>
            {isOpen ? <ChevronRightIcon /> : <MoreVertical />}
          </IconButton>
        </Hidden>
      </div>
    </Toolbar>
  );
}

export default ToolbarMenu;
