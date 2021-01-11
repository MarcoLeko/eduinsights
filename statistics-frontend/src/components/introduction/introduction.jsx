import React from "react";
import Box from "@material-ui/core/Box";
import { Paper, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { AppDescription } from "../SEO/app-description";
import "./introduction.scss";

const content = {
  goal:
    '„Education is a human right for all throughout life and that access must be matched by quality."',
  explanation: [
    "Education provides the basis for Knowledge as a good. Hence its getting more important to ensure equal standards and overcome financial and cultural boundaries. ",
    "There are huge inequalities between nations, That's why member states of the United Nations Sustainable Development Summit formally adopted the ",
    "2030 Agenda for Sustainable Development. ",
    "The agenda contains 17 goals including a new global education goal (SDG 4). SDG 4 is to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all’ and has seven targets and three means of implementation. - source: ",
    "UNESCO. ",
  ],
  bottomLine:
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
  return (
    <Box component={"section"} className="box">
      <Paper className="bottom-line">
        <Typography variant={"overline"}>{content.goal}</Typography>
      </Paper>
      <Typography variant={"body1"} color="textSecondary" gutterBottom>
        {content.explanation[0]}
        {content.explanation[1]}
        <Link href="https://sdgs.un.org/2030agenda">
          {content.explanation[2]}
        </Link>
        {content.explanation[3]}
        <Link href="https://en.unesco.org/gem-report/sdg-goal-4">
          {content.explanation[4]}
        </Link>
        {content.bottomLine}
      </Typography>
      <AppDescription description={getTextContent(content)} />
    </Box>
  );
}

export default Introduction;
