import React from "react";
import { Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Euler, Vector3 } from "three";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    fontWeight: 700,
    minWidth: 64,
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 2,
    color: "inherit",
    opacity: 0.8,
    lineHeight: 1.75,
    padding: "6px 16px",
    height: 42,
    background: "rgba(255, 255, 255, 0.8) !important",
  },
}));

const defaultCameraPos = new Vector3(
  2.1431318985078682e-14,
  2.1431318985078682e-14,
  350
);
const defaultCameraRoation = new Euler(
  -6.123233995736766e-17,
  -6.123233995736766e-17,
  3.749399456654644e-33
);
const defaultControlsTarget = new Vector3(0, 0, 0);

function resetCameraPosition(camera, controls) {
  camera.position.set(
    defaultCameraPos.x,
    defaultCameraPos.y,
    defaultCameraPos.z
  );
  camera.rotation.set(
    defaultCameraRoation.x,
    defaultCameraRoation.y,
    defaultCameraRoation.z
  );
  controls.target.set(
    defaultControlsTarget.x,
    defaultControlsTarget.y,
    defaultControlsTarget.z
  );

  camera.updateProjectionMatrix();
}

function ResetViewGlobeButton({ camera, controls }) {
  const classes = useStyles();

  return (
    <Button
      classes={{ root: classes.root }}
      onClick={() => resetCameraPosition(camera, controls)}
    >
      Reset view
    </Button>
  );
}

export default ResetViewGlobeButton;
