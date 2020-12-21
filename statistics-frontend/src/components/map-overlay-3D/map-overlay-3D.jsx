import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Fab,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import Introduction from "./introduction";
import Globe from "react-globe.gl";
import EarthNight from "../../assets/earth-night.jpg";
import EarthDay from "../../assets/earth-day.jpg";
import EarthTopology from "../../assets/earth-topology.png";
import { useUiContext } from "../../hooks/use-ui-context";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useMapStatistics } from "../../hooks/use-map-statistics";
import { getColor, getColorRange } from "../shared/getColor";
import "./map-overlay-3D.scss";
import { Euler, Vector3 } from "three";

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    position: "relative",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  labelTop: {
    marginTop: theme.spacing(2),
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
export function MapOverlay3D() {
  const {
    state: { theme },
  } = useUiContext();
  const classes = useStyles();
  const globeRef = useRef(null);
  const {
    geoJsonFromSelectedStatistic,
    selectedStatistic,
    allMapStatistics,
    setSelectedStatistic,
    fetchMapStatisticsById,
  } = useMapStatistics(null);
  const [activeHoveredPolygon, setActiveHoveredPolygon] = useState(null);

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
  }

  useEffect(() => {
    const camera = globeRef?.current?.camera();
    const controls = globeRef?.current?.controls();
    resetCameraPosition(camera, controls);
    camera.updateProjectionMatrix();
  }, [geoJsonFromSelectedStatistic]);

  function getGlobeWidth() {
    return document.body.clientWidth > 1280 ? 1280 : document.body.clientWidth;
  }
  return (
    <Container disableGutters classes={{ root: classes.containerRoot }}>
      <Introduction />
      {selectedStatistic && (
        <FormControl className={classes.formControl}>
          <InputLabel id="select-statistic-label">Statistic</InputLabel>
          <Select
            labelId="select-statistic-label"
            id="statistic-select"
            value={selectedStatistic}
            onChange={(e) => {
              setSelectedStatistic(e.target.value);
              fetchMapStatisticsById(e.target.value);
            }}
            className={classes.labelTop}
          >
            {allMapStatistics.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                {item.description}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            By choosing a new statistic the globe might take time to refresh
          </FormHelperText>
        </FormControl>
      )}
      {geoJsonFromSelectedStatistic.features && (
        <>
          <Globe
            ref={globeRef}
            width={getGlobeWidth()}
            globeImageUrl={theme === "dark" ? EarthNight : EarthDay}
            bumpImageUrl={EarthTopology}
            polygonStrokeColor={() => "#111"}
            polygonSideColor={() => "#111"}
            polygonCapColor={(layer) =>
              layer === activeHoveredPolygon
                ? "steelblue"
                : getColor(
                    getColorRange(
                      geoJsonFromSelectedStatistic.evaluation,
                      layer
                    ).key
                  )
            }
            polygonLabel={({ properties: layer }) => `
        <div class="polygon-label"><b>${layer.name} (${layer.id}):</b> <br />
        value: <i>${layer.value}%</i><br/>
        capital: <i>${layer.capital}</i>
        </div>
      `}
            onPolygonHover={setActiveHoveredPolygon}
            polygonsTransitionDuration={300}
            polygonsData={geoJsonFromSelectedStatistic.features}
          />
          <Fab
            aria-label="Scroll down"
            className={classes.fab}
            color="inherit"
            onClick={() =>
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            {<UpIcon />}
          </Fab>
        </>
      )}
    </Container>
  );
}
