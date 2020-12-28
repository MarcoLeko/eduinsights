import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { ColumnToRow, Item, Row } from "@mui-treasury/components/flex";
import { NavItem, NavMenu } from "@mui-treasury/components/menu/navigation";
import {
  SocialLink,
  SocialProvider,
} from "@mui-treasury/components/socialLink";

import { useMoonSocialLinkStyles } from "@mui-treasury/styles/socialLink/moon";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";
import Copyright from "../shared/copyright";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as StackOverflowLogo } from "../../assets/stack-overflow-logo.svg";
import { name as appName } from "../../../package.json";
import "./footer.scss";

const useStyles = makeStyles(
  ({ typography, palette, breakpoints, spacing }) => ({
    legalLink: {
      ...typography.caption,
      justifyContent: "center",
      color:
        palette.type === "dark"
          ? "rgba(255,255,255,0.57)"
          : palette.text.secondary,
      position: "relative",
      [breakpoints.up("sm")]: {
        "&:not(:first-of-type)": {
          "&:before": {
            content: '"|"',
            display: "block",
            position: "absolute",
            left: 0,
          },
        },
      },
    },
    newsletter: {
      fontSize: typography.caption.fontSize,
    },
    navMenu: {
      flexWrap: "wrap",
    },
    logo: {
      marginRight: spacing(1),
    },
  })
);

export const Footer = React.memo(function () {
  const classes = useStyles();
  return (
    <Box bgcolor={"default"} width={"100%"}>
      <Container>
        <Box pt={8} pb={2}>
          <Row wrap>
            <Item grow={2}>
              <Row alignItems={"center"}>
                <Item color={"#007bff"} fontSize={64} lineHeight={0}>
                  <Logo height={40} width={40} className={classes.logo} />
                </Item>
                <Item>
                  <Typography variant={"h6"} color={"textSecondary"}>
                    {appName}
                  </Typography>
                </Item>
              </Row>
            </Item>
            <Item grow maxWidth={500} mx={"auto"}>
              <Box textAlign={"center"} mt={{ xs: 2, md: 0 }} my={2}>
                <SocialProvider useStyles={useMoonSocialLinkStyles}>
                  <a
                    className="custom-social-link"
                    target="_blank"
                    href={
                      "https://stackoverflow.com/users/9032085/marcole?tab=profile"
                    }
                  >
                    <StackOverflowLogo />
                  </a>
                  <SocialLink
                    brand={"GithubCircle"}
                    href={"https://www.github.com/MarcoLeko"}
                  />
                  <SocialLink
                    brand={"Instagram"}
                    href={"https://www.instagram.com/marco.leko/"}
                  />
                </SocialProvider>
              </Box>
            </Item>
          </Row>
        </Box>
        <Divider />
        <Box pt={2} pb={10}>
          <ColumnToRow
            at={"md"}
            columnStyle={{ alignItems: "center" }}
            rowStyle={{ alignItems: "unset" }}
          >
            <Item grow ml={-2} shrink={0}>
              <NavMenu useStyles={usePlainNavigationMenuStyles}>
                <ColumnToRow at={"sm"}>
                  <NavItem className={cx(classes.legalLink)} href={"/legal"}>
                    Legal
                  </NavItem>
                  <NavItem
                    className={cx(classes.legalLink)}
                    href={"https://github.com/MarcoLeko/eduinsights"}
                  >
                    Code
                  </NavItem>
                </ColumnToRow>
              </NavMenu>
            </Item>
            <Item>
              <Box py={1} textAlign={{ xs: "center", md: "right" }}>
                <Copyright />
              </Box>
            </Item>
          </ColumnToRow>
        </Box>
      </Container>
    </Box>
  );
});
