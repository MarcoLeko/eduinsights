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
import { Link } from "@material-ui/core";

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
    box: {
      alignItems: "center",
    },
    navMenu: {
      flexWrap: "wrap",
    },
    logo: {
      marginRight: spacing(1),
    },
    customSocialLinkItem: {
      display: "inline-flex",
      padding: 12,
      fontSize: spacing(3),
      transition: "0.3s ease-out",
      alignItems: "center",
      borderRadius: 40,
      border:
        palette.type === "dark"
          ? "1px solid rgba(255, 255, 255, 0.12)"
          : "1px solid rgba(0, 0, 0, 0.12)",
      "&:hover": {
        transform: "translateY(-4px)",
        color: palette.type === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
        borderColor:
          palette.type === "dark"
            ? "rgba(255,255,255, 0.7)"
            : "rgba(0, 0, 0, 0.54)",
      },
      "& > svg": {
        height: "1em",
        width: "1em",
      },
    },
  })
);

export const Footer = React.memo(function () {
  const classes = useStyles();
  return (
    <Box bgcolor={"default"} width={"100%"}>
      <Container>
        <Box pt={8} pb={2}>
          <Row wrap classes={{ root: classes.box }}>
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
                  <Link
                    classes={{ root: classes.customSocialLinkItem }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://stackoverflow.com/users/9032085/marcole?tab=profile"
                    }
                  >
                    <StackOverflowLogo />
                  </Link>
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
