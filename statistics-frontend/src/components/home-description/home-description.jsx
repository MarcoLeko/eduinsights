import React from "react";
import Box from "@material-ui/core/Box";
import { Paper, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import "./home-description.scss";
import MonitoringLogo from "../../assets/UIS-logo.svg";

function HomeDescription() {
  return (
    <Box component={"section"} className="home-box p-1">
      <Paper className="bottom-line">
        <Typography variant={"body1"} color="textSecondary">
          „Education is a human right for all throughout life and that access
          must be matched by quality."
        </Typography>
      </Paper>
      <Typography variant={"body1"} color="textSecondary" gutterBottom>
        Education provides the basis for knowledge as a resource. Hence it's
        getting more important to ensure equal standards and overcome financial
        and cultural boundaries. There are huge inequalities between nations,
        that's why member states of the United Nations Sustainable Development
        Summit formally adopted the{" "}
        <Link href="https://sdgs.un.org/2030agenda">
          2030 Agenda for Sustainable Development.{" "}
        </Link>
        This framework helps to guide governments and partners on how to turn
        commitments into action. The agenda contains 17 goals including a new
        global education goal (SDG 4). SDG 4 is designed to ensure inclusive and
        equitable quality education and promote lifelong learning opportunities
        for all. - source:{" "}
        <Link href="https://en.unesco.org/gem-report/sdg-goal-4">UNESCO. </Link>
        Eduinsights is build to highlight educational inequalities of the world.
        You can select an observation provided by the UIS API. Then proceed by
        choosing the visualization mode: 2D or 3D Representation. And finally
        observe the results on the visualization. We are in close contact with
        UIS to provide the latest observations in order to better raise
        awareness for this topic.
      </Typography>
      <img
        src={MonitoringLogo}
        className="graphic"
        width="200"
        height="100"
        loading="lazy"
        alt="Data provided by UNESCO"
      />
    </Box>
  );
}

export default HomeDescription;
