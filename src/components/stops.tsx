/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useLayer,
  useLayerHoverPopup,
  useSource,
} from "@mapcomponents/react-maplibre";
import { formatString } from "pol-ui";
import { useId, useRef } from "react";
import { StopsObject } from "../types/stops";
interface StopsProps {
  stops: StopsObject;
  setSelectedStop: (stop: string) => void;
}

export const Stops = ({ stops, setSelectedStop }: StopsProps) => {
  const id = useId();
  const sourceName = useRef("gpx-viewer-source-" + id);
  const layerNamePoints = useRef("importer-layer-points-" + id);

  useLayerHoverPopup({
    layerId: layerNamePoints.current,
    getPopupContent: (feature) => {
      return formatString(feature.properties?.["stop_name"]);
    },
  });

  useSource({
    sourceId: sourceName.current,
    source: {
      type: "geojson",
      data: stops as any,
    },
  });

  useLayer({
    onClick: (ev) => {
      const e = ev as any;
      setSelectedStop(e.features[0]._vectorTileFeature.properties["stop_name"]);
    },

    layerId: layerNamePoints.current,
    options: {
      type: "circle",
      paint: {
        "circle-color": "rgb(10, 20, 10)",
        "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          0,
          11,
          0.5,
          15,
          1,
        ],
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 12, 4, 15, 8],
      },
      filter: ["==", "$type", "Point"],
      source: sourceName.current,
    },
  });

  return <> </>;
};
