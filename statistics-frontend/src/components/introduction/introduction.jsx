import React from "react";
import Box from "@material-ui/core/Box";
import { Paper, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  captionRoot: {
    color: theme.palette.primary.contrastText,
  },
  paperRoot: {
    padding: theme.spacing(1, 2),
  },
}));
function Introduction() {
  const classes = useStyles();
  return (
    <Box component={"section"} m={1}>
      <Paper
        variant={"outlined"}
        square
        classes={{
          root: classes.paperRoot,
        }}
      >
        <Typography variant={"overline"}>
          {
            "Education is a human right for all throughout life and that access must be matched by quality. "
          }
        </Typography>
        <Typography variant={"overline"}>
          {
            "Education is widely accepted to be a fundamental resource, both for individuals and societies. "
          }
        </Typography>
        <Typography variant={"overline"}>
          {
            "However there still huge inequalities between nations, That's why Member States of the United Nations Sustainable Development Summit formally adopted the "
          }
        </Typography>
        <Link href="https://sdgs.un.org/2030agenda">
          <Typography variant={"overline"}>
            {"2030 Agenda for Sustainable Development"}
          </Typography>
        </Link>
      </Paper>

      <Typography variant={"caption"} color={"secondary"}>
        {
          "The agenda contains 17 goals including a new global education goal (SDG 4). SDG 4 is to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all’ and has seven targets and three means of implementation. - source: "
        }
        <Link href="https://en.unesco.org/gem-report/sdg-goal-4">
          <Typography variant={"overline"}>{"UNESCO"}</Typography>
        </Link>
      </Typography>
    </Box>
  );
}

export default Introduction;
