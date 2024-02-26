/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from "pol-ui";
import { LngLatBoundsLike } from "maplibre-gl";

export interface MlGpxViewerProps {
  mapId?: string;
  idPrefix?: string;

  line: LineType;
  isSelectable?: boolean;
  isSelected?: boolean;
  setSelectedLine?: (line: LineType) => void;

  setSelectedStop?: (stopId: string) => void;
  selectedStop?: string;
}

export const Line = ({
  line,
  setSelectedStop,
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
    onClick: handleSelect,

    options: {
      type: "line",

      paint: {
        "line-width": 3,
        "line-opacity": isSelected ? 1 : 0.3,
        "line-color": line.metadata?.color || "rgba(72, 77, 99,0.5)",
      },
      source: sourceName.current,
    },
  });

  useLayer({
    onClick: (ev) => {
      // properties are separated by commas as csv , get the number next to the wilidata key

      // get the last -2 item in the array
      const e = ev as any;
      const stopId = e.features[0].properties.cmt
        .split(",")
        .slice(-1)[0]
        .split(":")[1];

      toast({
        title: e.features[0].properties.name,
        description: "Stop selected",
      });

      setSelectedStop?.(stopId);
      handleSelect();
    },

    layerId: layerNamePoints.current,
    options: {
      type: "circle",
      paint: {
        "circle-color": line.metadata?.color || "rgba(72, 77, 99,0.5)",
        "circle-opacity": isSelected ? 1 : 0.3,
        "circle-radius": 7,
      },
      filter: ["==", "$type", "Point"],
      source: sourceName.current,
    },
  });

  useEffect(() => {
    if (!mapHook.map || !parsedGpx.geojson) return;

    // fit map view to GeoJSON bbox

    const bounds = bbox(parsedGpx.geojson);
    mapHook.map.map.fitBounds(bounds as LngLatBoundsLike, {
      padding: 20,
    });
  }, [mapHook.map, parsedGpx, props]);

  return <></>;
};
