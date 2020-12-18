import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Fingerprint from "@material-ui/icons/Fingerprint";
import Box from "@material-ui/core/Box";
import { Link, makeStyles, Typography } from "@material-ui/core";
import Contribute from "@material-ui/icons/Code";
import Copyright from "../shared/copyright";
import { muiBackground } from "../shared/material-ui-background";

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: muiBackground,
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    justifyContent: "space-between",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  linkItem: {
    width: "inherit",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  listItemText: {
    flex: "0.5 0.5 auto",
  },
}));

function SideBar(props) {
  const classes = useStyles();
  const navItems = [
    {
      icon: <Fingerprint />,
      name: "Imprint",
      link: "/imprint",
    },
    {
      icon: <Contribute />,
      name: "Code",
      link: "https://github.com/MarcoLeko/eduinsights",
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      elevation={2}
      anchor="right"
      open={props.isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        {navItems.map(({ icon, name, link }, index) => (
          <ListItem button key={index}>
            <Link href={link} className={classes.linkItem}>
              <ListItemIcon className={classes.logoPanel}>{icon}</ListItemIcon>
              <ListItemText primary={name} className={classes.listItemText} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Box p={2}>
        <Divider />
        <Typography variant={"subtitle1"}>
          <Copyright />
        </Typography>
      </Box>
    </Drawer>
  );
}

export default SideBar;
