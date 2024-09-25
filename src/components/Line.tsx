/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MlSpatialElevationProfile,
  useLayer,
  useLayerHoverPopup,
  useSource,
} from "@mapcomponents/react-maplibre";
import { useId, useRef } from "react";
import { LineType } from "../types/types";

export interface MlGpxViewerProps {
  line: LineType;
  isSelected?: boolean;
  seeElevation?: boolean;
}

export const Line = ({ line, isSelected, seeElevation }: MlGpxViewerProps) => {
  const id = useId();
  const parsedGpx = JSON.parse(line.gpx);

  const sourceName = useRef("gpx-viewer-source-" + id);
  const layerNameLines = useRef("importer-layer-lines-" + id);
  const layerNamePoints = useRef("importer-layer-points-" + id);

  useLayerHoverPopup({
    layerId: layerNamePoints.current,
    getPopupContent: (feature) => feature?.properties?.name,
  });

  useSource({
    sourceId: sourceName.current,
    source: {
      type: "geojson",
      data: parsedGpx,
    },
  });

  useLayer({
    layerId: layerNameLines.current,

    options: {
      type: "line",

      paint: {
        "line-width": isSelected
          ? ["interpolate", ["linear"], ["zoom"], 5, 2, 22, 10]
          : 0.01,
        "line-color": line.metadata?.color || "rgba(72, 77, 99,0.5)",
      },
      source: sourceName.current,
    },
  });

  return (
    <MlSpatialElevationProfile
      geojson={parsedGpx}
      elevationFactor={seeElevation ? 2 : 0.000001}
    />
  );
};
