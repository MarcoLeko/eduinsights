import React from "react";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";

export const navigationItems = [
  {
    name: "Home",
    link: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    name: "Query builder",
    link: "/query-builder",
    icon: <BuildOutlinedIcon />,
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
