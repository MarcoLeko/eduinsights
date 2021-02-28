import * as React from "react";
import { Grid, Hidden, Link, List, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import MoreVertical from "@material-ui/icons/MoreVert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import { name as projectName } from "../../../package.json";
import { ThemeSelector } from "../shared/theme-selector";
import Box from "@material-ui/core/Box";
import { ReactComponent as StackOverflowLogo } from "../../assets/stack-overflow-logo.svg";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import "./toolbar-menu.scss";

function ToolbarMenu({ isOpen, toggle }) {
  function toggleByButtonClick() {
    toggle(!isOpen);
  }

  return (
    <>
      <Hidden xsDown>
        <Box px={2} py={1}>
          <Grid container justify={"space-between"} alignItems={"center"}>
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
            <Grid item>
              <Grid container alignItems={"center"}>
                <Link
                  color="secondary"
                  href={
                    "https://stackoverflow.com/users/9032085/marcole?tab=profile"
                  }
                >
                  <StackOverflowLogo className="mr-2 item-stack-overflow" />
                </Link>
                <Link
                  color="secondary"
                  href={"https://www.github.com/MarcoLeko"}
                >
                  <GitHubIcon className="mr-2 item-github" />
                </Link>
                <Link
                  color="secondary"
                  href={"https://www.instagram.com/marco.leko/"}
                >
                  <InstagramIcon className="item-instagram" />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Hidden>
      <Toolbar className="d-flex toolbar justify-space-between">
        <div className="d-flex header-navigation-panel align-center">
          <Logo className="header-icon-navigation" />
          <Link href={"/"} underline={"none"} color={"secondary"}>
            <Typography
              variant={"h4"}
              color="secondary"
              className="header-text-navigation"
            >
              {projectName}
            </Typography>
          </Link>
        </div>
        <Hidden xsDown>
          <List className="header-list">
            <ThemeSelector />
          </List>
        </Hidden>
        <Hidden smUp>
          <IconButton onClick={toggleByButtonClick}>
            {isOpen ? <ChevronRightIcon /> : <MoreVertical />}
          </IconButton>
        </Hidden>
      </Toolbar>
    </>
  );
}

export default ToolbarMenu;
