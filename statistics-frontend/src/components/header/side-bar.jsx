import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Fingerprint from "@material-ui/icons/Fingerprint";
import Box from "@material-ui/core/Box";
import {
  Link,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Copyright from "../shared/copyright";
import { useUiContext } from "../../hooks/use-ui-context";
import { grey } from "@material-ui/core/colors";
import { setTheme } from "../../context/ui-actions";

export const drawerWidth = 240;

const useStyles = (params) =>
  makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
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

const themeOptions = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
];

const navItems = [
  {
    icon: <Fingerprint />,
    name: "Imprint",
    link: "/imprint",
  },
  {
    icon: <Brightness4Icon />,
    name: "Design",
    link: null,
  },
  {
    icon: <GitHubIcon />,
    name: "Code",
    link: "https://github.com/MarcoLeko/eduinsights",
  },
];

function SideBar(props) {
  const {
    state: { theme },
    dispatch,
  } = useUiContext();
  const classes = useStyles(theme)();
  const [menuElement, setMenuElement] = useState(null);

  const handleDesignMenuClick = (event) => {
    setMenuElement(event.currentTarget);
  };

  const handleDesignMenuClose = () => {
    setMenuElement(null);
  };

  const handleMenuItemClick = (event, value) => {
    dispatch(setTheme(value));
  };

  return (
    <Drawer
      variant="persistent"
      elevation={2}
      anchor="right"
      open={props.isOpen}
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper,
      }}
    >
      <List>
        {navItems.map(({ icon, name, link }, index) => (
          <div key={index}>
            {link ? (
              <ListItem button>
                <Link href={link} className={classes.linkItem}>
                  <ListItemIcon className={classes.logoPanel}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    className={classes.listItemText}
                  />
                </Link>
              </ListItem>
            ) : (
              name === "Design" && (
                <>
                  <ListItem
                    button
                    component="button"
                    aria-controls="design-menu"
                    aria-haspopup="true"
                    onClick={handleDesignMenuClick}
                  >
                    <ListItemIcon className={classes.logoPanel}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={name}
                      className={classes.listItemText}
                    />
                  </ListItem>
                  <Menu
                    id="design-menu"
                    anchorEl={menuElement}
                    keepMounted
                    open={Boolean(menuElement)}
                    onClose={handleDesignMenuClose}
                    classes={{ paper: classes.menuPaper }}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  >
                    {themeOptions.map((option, index) => (
                      <MenuItem
                        key={option.label}
                        selected={option.value === theme}
                        onClick={(event) =>
                          handleMenuItemClick(event, option.value)
                        }
                      >
                        <Typography variant="inherit">
                          {option.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )
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
