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

interface StopClickEvent {
  features?: Array<{
    properties?: Record<string, unknown>;
  }>;
}

export const Stops = ({ stops, setSelectedStop }: StopsProps) => {
  const id = useId();
  const sourceName = useRef("gpx-viewer-source-" + id);
  const layerNamePoints = useRef("importer-layer-points-" + id);
  const handleStopClick = (event: unknown) => {
    const stopName = (event as StopClickEvent).features?.[0]?.properties?.stop_name;
    if (typeof stopName === "string") setSelectedStop(stopName);
  };

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
      data: stops as unknown as string,
    },
  });

  useLayer({
    onClick: handleStopClick,

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
