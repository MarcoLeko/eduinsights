import React from "react";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeIcon from "@material-ui/icons/Home";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import BuildIcon from "@material-ui/icons/Build";

export const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <HomeOutlinedIcon />,
    iconActive: <HomeIcon />,
  },
  {
    name: "Query builder (Beta)",
    link: "/query-builder",
    icon: <BuildOutlinedIcon />,
    iconActive: <BuildIcon />,
  },
];

export const navItemsSideBar = [
  {
    icon: <Brightness4Icon />,
    name: "Design",
    link: null,
  },
  {
    icon: <Fingerprint />,
    name: "Legal",
    link: "/legal",
  },
  {
    icon: <GitHubIcon />,
    name: "Code",
    link: "https://github.com/MarcoLeko/eduinsights",
  },
];
