import * as React from "react";
import { Grid, Hidden, Link, List, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { name as projectName } from "../../../package.json";
import { ThemeSelector } from "../shared/theme-selector";
import Box from "@material-ui/core/Box";
import { ReactComponent as StackOverflowLogo } from "../../assets/stack-overflow-logo.svg";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  socialLinkItemContainer: { display: "flex" },
  socialLinkItemGithub: { height: "18px" },
  socialLinkItemInstagram: { height: "20px" },
  socialLinkItemStackOverflow: { height: "24px" },
  marginRight: { marginRight: theme.spacing(2) },
  root: {
    minHeight: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 4px",
  },
  header: { fontWeight: 300, paddingLeft: theme.spacing(2) },
  headerBottomLine: { fontWeight: 300, fontStyle: "italic" },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
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
    <>
      <Hidden xsDown>
        <Box px={2} py={1}>
          <Grid container justify={"space-between"} alignItems={"center"}>
            <Grid item>
              <Grid container alignItems={"center"}>
                <Link
                  color="secondary"
                  href={
                    "https://stackoverflow.com/users/9032085/marcole?tab=profile"
                  }
                >
                  <StackOverflowLogo
                    className={`${classes.socialLinkItemStackOverflow} ${classes.marginRight}`}
                  />
                </Link>
                <Link
                  color="secondary"
                  href={"https://www.github.com/MarcoLeko"}
                >
                  <GitHubIcon
                    className={`${classes.socialLinkItemGithub} ${classes.marginRight}`}
                  />
                </Link>
                <Link
                  color="secondary"
                  href={"https://www.instagram.com/marco.leko/"}
                >
                  <InstagramIcon className={classes.socialLinkItemInstagram} />
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              <Link color="secondary" className="footer-link" href={"/legal"}>
                Legal
              </Link>
              <Link
                color="secondary"
                className="footer-link"
                href={"https://github.com/MarcoLeko/eduinsights"}
              >
                Code
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Hidden>
      <Toolbar className={classes.root}>
        <Link href={"/"} underline={"none"} color={"secondary"}>
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
    </>
  );
}

export default ToolbarMenu;
