/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useLayer,
  useLayerHoverPopup,
  useSource,
} from "@mapcomponents/react-maplibre";
import { useId, useRef } from "react";
import { Stops as IStops } from "../types/stops";
interface StopsProps {
  stops: IStops;
  setSelectedStop: (stop: string) => void;
}

export const Stops = ({ stops, setSelectedStop }: StopsProps) => {
  const id = useId();
  const sourceName = useRef("gpx-viewer-source-" + id);
  const layerNamePoints = useRef("importer-layer-points-" + id);

  useLayerHoverPopup({
    layerId: layerNamePoints.current,
    getPopupContent: (feature) => {
      console.log("feature", feature.properties?.["EQUIPAMENT"]);
      return feature.properties?.["EQUIPAMENT"];
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
      console.log(e.features[0]._vectorTileFeature.properties["EQUIPAMENT"]);
      setSelectedStop(
        e.features[0]._vectorTileFeature.properties["EQUIPAMENT"]
      );
    },

    layerId: layerNamePoints.current,
    options: {
      type: "circle",

      paint: {
        "circle-color": "rgb(10, 20, 10)",
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 4, 15, 8],
      },
      filter: ["==", "$type", "Point"],
      source: sourceName.current,
    },
  });

  return <> </>;
};
