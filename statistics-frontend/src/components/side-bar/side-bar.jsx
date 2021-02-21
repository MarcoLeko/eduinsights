import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import { makeStyles, Typography } from "@material-ui/core";
import Copyright from "../shared/copyright";
import { useUiContext } from "../../hooks/use-ui-context";
import { grey } from "@material-ui/core/colors";
import { ThemeSelector } from "../shared/theme-selector";
import { useHistory } from "react-router-dom";
import { navItemsSideBar } from "../shared/navigation-items";

const useStyles = (params) =>
  makeStyles((theme) => ({
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
      backgroundColor: params === "dark" ? grey[900] : grey[100],
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
    menuPaper: {
      width: 220,
    },
  }));

function SideBar({ isOpen }) {
  const { theme } = useUiContext();
  const classes = useStyles(theme)();
  const history = useHistory();

  function navigate(link) {
    if (link.indexOf("http://") === 0 || link.indexOf("https://") === 0) {
      window.location.href = link;
    } else {
      history.push(link);
    }
  }

  return (
    <Drawer
      variant="persistent"
      elevation={2}
      anchor="right"
      open={isOpen}
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper,
      }}
    >
      <List>
        {navItemsSideBar.map(({ icon, name, link }, index) => (
          <div key={index}>
            {link ? (
              <ListItem button onClick={() => navigate(link)}>
                <ListItemIcon className={classes.logoPanel}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} className={classes.listItemText} />
              </ListItem>
            ) : (
              name === "Design" && <ThemeSelector />
            )}
          </div>
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
