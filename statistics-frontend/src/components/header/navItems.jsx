import React from "react";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import GitHubIcon from "@material-ui/icons/GitHub";

export const navItems = [
  {
    icon: <Brightness4Icon />,
    name: "Design",
    link: null,
  },
  {
    icon: <Fingerprint />,
    name: "Imprint",
    link: "/imprint",
  },
  {
    icon: <GitHubIcon />,
    name: "Code",
    link: "https://github.com/MarcoLeko/eduinsights",
  },
];
