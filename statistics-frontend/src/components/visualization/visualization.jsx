import React from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import PublicTwoToneIcon from "@material-ui/icons/PublicTwoTone";
import MapTwoToneIcon from "@material-ui/icons/MapTwoTone";
import { useQueryParamsListener } from "../../hooks/use-query-params-listener";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2, 1),
    maxHeight: 320,
    maxWidth: 240,
  },
  paperRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  svgIcon: {
    width: "30%",
    height: "auto",
  },
}));

export function Visualization({ addNextQueryParam }) {
  const classes = useStyles();

  const visualizations = [
    {
      label: "2D Display",
      icon: <MapTwoToneIcon classes={{ root: classes.svgIcon }} />,
      key: "map",
    },
    {
      label: "3D Display",
      icon: <PublicTwoToneIcon classes={{ root: classes.svgIcon }} />,
      key: "globe",
    },
  ];

  return (
    <Grid container justify="center" className={classes.root} spacing={4}>
      {visualizations.map((visualization) => (
        <Grid key={visualization.key} item>
          <Paper
            className={classes.paper}
            classes={{ root: classes.paperRoot }}
            variant={"outlined"}
          >
            {visualization.icon}
            <Typography variant="overline" component="h6" color={"textPrimary"}>
              {visualization.label}
            </Typography>
            <Button
              onClick={() =>
                addNextQueryParam({ visualization: visualization.key })
              }
              size={"small"}
              variant="contained"
              color="primary"
            >
              Select
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
