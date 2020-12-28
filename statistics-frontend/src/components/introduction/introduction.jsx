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
    padding: theme.spacing(2, 1),
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  box: {
    margin: theme.spacing(1),
  },
}));
function Introduction() {
  const classes = useStyles();
  return (
    <Box component={"section"} className={classes.box}>
      <Paper
        classes={{
          root: classes.paperRoot,
        }}
      >
        <Typography variant={"overline"}>
          „Education is a human right for all throughout life and that access
          must be matched by quality."
        </Typography>
      </Paper>
      <Typography variant={"body1"}>
        {
          "However there are still huge inequalities between nations, That's why member states of the United Nations Sustainable Development Summit formally adopted the "
        }
      </Typography>
      <Link href="https://sdgs.un.org/2030agenda">
        <Typography variant={"body1"}>
          {"2030 Agenda for Sustainable Development"}
        </Typography>
      </Link>
      <Typography variant={"body1"}>
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
