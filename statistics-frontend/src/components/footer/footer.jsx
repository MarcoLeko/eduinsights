import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import Copyright from "../shared/copyright";
import { ReactComponent as StackOverflowLogo } from "../../assets/stack-overflow-logo.svg";
import { name as appName } from "../../../package.json";
import { Grid, Link } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import "./footer.scss";

export const Footer = React.memo(function () {
  return (
    <Box bgcolor={"default"} width={"100%"}>
      <Container>
        <Box pt={8} pb={{ md: 2 }}>
          <Grid container justify={"space-between"} alignItems={"center"}>
            <Typography variant={"h6"} color={"textSecondary"}>
              {appName}
            </Typography>
            <Grid mx={"auto"}>
              <Box textAlign={"center"} mt={{ xs: 2, md: 0 }} my={2}>
                <Link
                  className="social-link"
                  color="secondary"
                  href={
                    "https://stackoverflow.com/users/9032085/marcole?tab=profile"
                  }
                >
                  <StackOverflowLogo className="social-link-icon" />
                </Link>
                <Link
                  color="secondary"
                  className="social-link"
                  href={"https://www.github.com/MarcoLeko"}
                >
                  <GitHubIcon className="social-link-icon" />
                </Link>
                <Link
                  color="secondary"
                  className="social-link"
                  href={"https://www.instagram.com/marco.leko/"}
                >
                  <InstagramIcon className="social-link-icon" />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box pt={2} pb={10}>
          <Grid container justify={"center"}>
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
          <Box py={1}>
            <Copyright />
          </Box>
        </Box>
      </Container>
    </Box>
  );
});
