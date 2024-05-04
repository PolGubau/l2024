/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { bbox } from "@turf/turf";
import {
  MlSpatialElevationProfile,
  useLayer,
  useLayerHoverPopup,
  useMap,
  useSource,
} from "@mapcomponents/react-maplibre";
import { LineType } from "../types/types";
import { LngLatBoundsLike } from "maplibre-gl";

export interface MlGpxViewerProps {
  mapId?: string;
  idPrefix?: string;

  line: LineType;
  isSelectable?: boolean;
  isSelected?: boolean;
  setSelectedLine?: (line: LineType) => void;
  seeElevation?: boolean;
  selectedStop?: string;
}

export const Line = ({
  line,
  isSelected,
  seeElevation,
  setSelectedLine,
  ...props
}: MlGpxViewerProps) => {
  const handleSelect = () => {
    if (setSelectedLine) {
      setSelectedLine(line);
    }
  };

  const parsedGpx = JSON.parse(line.gpx);

  const mapHook = useMap({
    mapId: props.mapId,
  });
  const sourceName = useRef("gpx-viewer-source-" + Math.random());
  const layerNameLines = useRef("importer-layer-lines-" + Math.random());
  const layerNamePoints = useRef("importer-layer-points-" + Math.random());

  useLayerHoverPopup({
    layerId: layerNamePoints.current,
    getPopupContent: (feature) => feature?.properties?.name,
  });

  useSource({
    mapId: props.mapId,
    sourceId: sourceName.current,
    source: {
      type: "geojson",
      data: parsedGpx,
    },
  });

  useLayer({
    layerId: layerNameLines.current,
    onClick: handleSelect,

    options: {
      type: "line",

      paint: {
        "line-width": 3,
        "line-opacity": isSelected ? 1 : 1,
        "line-color": line.metadata?.color || "rgba(72, 77, 99,0.5)",
      },
      source: sourceName.current,
    },
  });

  useEffect(() => {
    if (!mapHook.map || !parsedGpx) return;

    // fit map view to GeoJSON bbox

    const bounds = bbox(parsedGpx);
    mapHook.map.map.fitBounds(bounds as LngLatBoundsLike, {
      padding: 20,
    });
  }, [mapHook.map, parsedGpx, props]);

  return (
    <MlSpatialElevationProfile
      geojson={parsedGpx}
      elevationFactor={seeElevation ? 2 : 0.01}
    />
  );
};
