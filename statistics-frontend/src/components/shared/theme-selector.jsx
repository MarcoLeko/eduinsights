import { Menu, MenuItem, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { setTheme } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { navItemsSideBar } from "./navigation-items";
import { setThemeSchema } from "../../helper/user-theme-schema";

const useStyles = makeStyles(() => ({
  linkItem: {
    height: 48,
  },
  listItemText: {
    flex: "0.5 0.5 auto",
  },
  menuPaper: {
    minWidth: 200,
  },
}));

const themeOptions = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
];

const navItem = navItemsSideBar.find((item) => item.name === "Design");

export function ThemeSelector() {
  const classes = useStyles();
  const { theme, dispatch } = useUiContext();
  const [menuElement, setMenuElement] = useState(null);

  const handleMenuItemClick = (event, value) => {
    dispatch(setTheme(value));
    setThemeSchema(value);
  };

  const handleThemeMenuClose = () => {
    setMenuElement(null);
  };

  const handleThemeMenuClick = (event) => {
    setMenuElement(event.currentTarget);
  };

  return (
    <>
      <ListItem
        button
        component="button"
        aria-controls="theme-menu"
        aria-haspopup="true"
        className={classes.linkItem}
        onClick={handleThemeMenuClick}
      >
        <ListItemIcon>{navItem.icon}</ListItemIcon>
        <ListItemText primary={navItem.name} className={classes.listItemText} />
      </ListItem>
      <Menu
        id="theme-menu"
        anchorEl={menuElement}
        keepMounted
        open={Boolean(menuElement)}
        onClose={handleThemeMenuClose}
        classes={{ paper: classes.menuPaper }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {themeOptions.map((option) => (
          <MenuItem
            key={option.label}
            selected={option.value === theme}
            onClick={(event) => handleMenuItemClick(event, option.value)}
          >
            <Typography variant="inherit">{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
