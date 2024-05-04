import {
  MapLibreMap,
  MlFillExtrusionLayer,
  MlNavigationTools,
} from "@mapcomponents/react-maplibre";
import { Switch } from "pol-ui";
import { useState } from "react";
import { linesData, stops } from "../data/lines";
import { Feature, Stops as IStops } from "../types/stops";
import { LineType } from "../types/types";
import { Line } from "./Line";
import { Stops } from "./stops";

const Board = () => {
  const args = {
    paint: {
      "fill-extrusion-color": "hsl(196, 61%, 83%)",
      "fill-extrusion-height": {
        property: "render_height",
        type: "identity",
      },
      "fill-extrusion-base": {
        property: "render_min_height",
        type: "identity",
      },
      "fill-extrusion-opacity": [
        "interpolate",
        // Set to interpoleta linearly between the pair of stops
        ["linear"],
        ["zoom"],
        // When zoom is 13.5, buildings will be 100% transparent.
        13.5,
        0,
        // When zoom is 15 or higher, buildings will be 100% opaque.
        14.5,
        1,
      ],
    },
  };
  const [selectedLine, setSelectedLine] = useState<LineType | null>(null);

  const featureStops: Feature[] = stops.features.filter((stop) => {
    return stop.properties.CODI_CAPA === "K001";
  });

  const metroStops: IStops = {
    type: "FeatureCollection",
    features: featureStops,
  };
  const [extras, setExtras] = useState({
    hasElevation: false,
    hasBuildings3d: false,
  });
  return (
    <section className=" gap-4 bg-neutral-200 h-full grid ">
      <div className="fixed top-2 left-2 z-10 p-2 gap-1 flex flex-col bg-secondary-50/70 backdrop-blur-sm rounded-xl">
        {Object.keys(extras).map((extra) => (
          <Switch
            size="sm"
            key={extra}
            label={extra}
            checked={extras[extra]}
            onChange={() =>
              setExtras((prev) => ({ ...prev, [extra]: !prev[extra] }))
            }
          >
            {extra}
          </Switch>
        ))}
      </div>
      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        {extras.hasBuildings3d && <MlFillExtrusionLayer {...args} />}
        {linesData.map((line) => (
          <Line
            seeElevation={extras.hasElevation}
            line={line}
            key={line.id}
            isSelected={selectedLine?.id === line.id || !selectedLine}
            setSelectedLine={setSelectedLine}
          />
        ))}
        <Stops stops={metroStops} />
        dsa
        <MapLibreMap
          options={{
            center: { lat: 41.390205, lng: 2.154007 },
            style: "/map/schema.json",
            zoom: 10,
          }}
          style={{
            minWidth: "100%",
            minHeight: "500px",
            height: "100%",
            // position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
        {/* {metroStops.map((stop) => (
          <MlMarker
            key={stop.properties.ADRECA}
            content="WhereGroup"
            lat={stop.geometry.coordinates?.[1] as number}
            lng={stop.geometry.coordinates?.[0] as number}
             mapId="map_1"
          />
        ))} */}
        <div className="hidden md:flex">
          <MlNavigationTools />
        </div>
      </div>
    </section>
  );
};

export default Board;
