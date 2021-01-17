import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import { name as appName } from "../../../package.json";

function Copyright({ showAppName = true }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {showAppName && (
        <Link color="inherit" href="/">
          {appName}
        </Link>
      )}
      {" - Marco Leko - "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
