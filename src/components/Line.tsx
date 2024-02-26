import { useEffect, useRef } from "react";
import { bbox } from "@turf/turf";
import toGeoJSON from "../util/toGeoJSON";
import {
  useLayer,
  useLayerHoverPopup,
  useMap,
  useSource,
} from "@mapcomponents/react-maplibre";
import { LineType } from "../types";

export interface MlGpxViewerProps {
  mapId?: string;
  idPrefix?: string;

  line: LineType;
  isSelectable?: boolean;
  isSelected?: boolean;
  setSelectedLine?: (line: LineType) => void;
}

export const Line = ({
  line,
  isSelected,
  setSelectedLine,
  ...props
}: MlGpxViewerProps) => {
  const handleSelect = () => {
    if (setSelectedLine) {
      setSelectedLine(line);
    }
  };

  const domParser = new DOMParser();
  const gpxDoc = domParser.parseFromString(line.gpx, "application/xml");
  const parsedGpx = toGeoJSON.gpx(gpxDoc);

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
    options: {
      type: "line",

      paint: {
        "line-width": 3,
        "line-opacity": isSelected ? 1 : 0.5,
        "line-color": line.metadata?.color || "rgba(72, 77, 99,0.5)",
      },
      source: sourceName.current,
      onClick: handleSelect,
    },
  });

  useLayer({
    onHover: (e) => {
      if (e.features.length > 0) {
        if (!mapHook.map) return;

        mapHook.map.map.getCanvas().style.cursor = "pointer";
      } else {
        if (!mapHook.map) return;

        mapHook.map.map.getCanvas().style.cursor = "";
      }
    },
    onClick: (e) => {
      alert(e.features[0].properties.name);
      handleSelect();
    },

    layerId: layerNamePoints.current,
    options: {
      type: "circle",
      paint: {
        "circle-color": line.metadata?.color || "rgba(72, 77, 99,0.5)",
        "circle-opacity": isSelected ? 1 : 0.3,
        "circle-radius": 6,
      },
      filter: ["==", "$type", "Point"],
      source: sourceName.current,
    },
  });

  useEffect(() => {
    if (!mapHook.map || !parsedGpx.geojson) return;

    // fit map view to GeoJSON bbox

    const bounds = bbox(parsedGpx.geojson);
    mapHook.map.map.fitBounds(bounds);
  }, [mapHook.map, parsedGpx, props]);

  return <></>;
};
