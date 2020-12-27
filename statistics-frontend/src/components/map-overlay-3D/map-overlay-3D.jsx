import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import EarthNight from "../../assets/earth-night.jpg";
import EarthDay from "../../assets/earth-day.jpg";
import EarthTopology from "../../assets/earth-topology.png";
import { useUiContext } from "../../hooks/use-ui-context";
import { useStatisticData } from "../../hooks/use-statistic-data";
import { getColor, getColorRange } from "../shared/getColor";
import "./map-overlay-3D.scss";
import { Euler, Vector3 } from "three";
import { useStatisticStepListener } from "../../hooks/use-statistic-step-listener";

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
  const globeRef = useRef(null);
  const { geoJsonFromSelectedStatistic } = useStatisticData(null);
  const [activeHoveredPolygon, setActiveHoveredPolygon] = useState(null);
  const { handleNext } = useStatisticStepListener();

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
    if (globeRef?.current) {
      const camera = globeRef.current.camera();
      const controls = globeRef.current.controls();
      resetCameraPosition(camera, controls);
      camera.updateProjectionMatrix();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoJsonFromSelectedStatistic]);

  function getGlobeWidth() {
    return document.body.clientWidth > 1280 ? 1280 : document.body.clientWidth;
  }

  return (
    <>
      {geoJsonFromSelectedStatistic.features && (
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
                  getColorRange(geoJsonFromSelectedStatistic.evaluation, layer)
                    .key
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
      )}
    </>
  );
}
