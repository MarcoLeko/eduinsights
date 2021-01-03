import React from "react";
import Box from "@material-ui/core/Box";
import { Grid, Paper, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GlobeGif from "../../assets/globe.gif";
import MapGif from "../../assets/map.gif";
import { AppDescription } from "../SEO/app-description";

const useStyles = makeStyles((theme) => ({
  captionRoot: {
    color: theme.palette.primary.contrastText,
  },
  paperHeadline: {
    padding: theme.spacing(2, 1),
    justifyContent: "center",
    background: "none",
    alignItems: "center",
    display: "flex",
    boxShadow: "none",
    marginBottom: theme.spacing(1),
  },
  box: {
    margin: theme.spacing(1),
  },
  paperVisualization: {
    height: 250,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
}));

const content = {
  goal:
    '„Education is a human right for all throughout life and that access must be matched by quality."',
  explanation: [
    "However there are still huge inequalities between nations, That's why member states of the United Nations Sustainable Development Summit formally adopted the ",
    "2030 Agenda for Sustainable Development. ",
    "The agenda contains 17 goals including a new global education goal (SDG 4). SDG 4 is to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all’ and has seven targets and three means of implementation. - source: ",
    "UNESCO. ",
  ],
  keyLine:
    "Eduinsights is build to highlight those educational inequalities in 2D or 3D representations of the world.",
};

function getTextContent(obj) {
  return Object.values(obj).reduce((prev, curr) => {
    if (Array.isArray(curr)) {
      return prev.concat(curr.join());
    }
    return prev.concat(curr);
  }, "");
}

function Introduction() {
  const classes = useStyles();

  return (
    <Box component={"section"} className={classes.box}>
      <Paper
        classes={{
          root: classes.paperHeadline,
        }}
      >
        <Typography variant={"overline"}>{content.goal}</Typography>
      </Paper>
      <Typography variant={"body1"} color="textSecondary" gutterBottom>
        {content.explanation[0]}
        <Link href="https://sdgs.un.org/2030agenda">
          {content.explanation[1]}
        </Link>
        {content.explanation[2]}
        <Link href="https://en.unesco.org/gem-report/sdg-goal-4">
          {content.explanation[3]}
        </Link>
        {content.keyLine}
      </Typography>
      <Grid container justify={"center"}>
        <Grid item xs={6} md={5}>
          <Paper
            classes={{ root: classes.paperVisualization }}
            style={{ backgroundImage: `url(${MapGif})`, marginRight: 16 }}
          />
        </Grid>
        <Grid item xs={6} md={5}>
          <Paper
            classes={{ root: classes.paperVisualization }}
            style={{ backgroundImage: `url(${GlobeGif})` }}
          />
        </Grid>
      </Grid>
      <AppDescription description={getTextContent(content)} />
    </Box>
  );
}

export default Introduction;
