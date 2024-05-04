import {
  MapLibreMap,
  MlFillExtrusionLayer,
  MlNavigationTools,
} from "@mapcomponents/react-maplibre";
import { Switch, formatString } from "pol-ui";
import { useState } from "react";
import { linesData, stops } from "../data/lines";
import { Stops as IStops } from "../types/stops";
import { LineType } from "../types/types";
import { Line } from "./Line";
import { Stops } from "./stops";

const Board = () => {
  const exclusionArgs = {
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
        14,
        0.5,
        // When zoom is 15 or higher, buildings will be 100% opaque.
        14.5,
        1,
      ],
    },
  };
  const [selectedLine, setSelectedLine] = useState<LineType | null>(null);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  const metroStops: IStops = {
    type: "FeatureCollection",
    features: stops.features,
  };
  const [extras, setExtras] = useState({
    hasElevation: false,
    hasBuildings: false,
  });
  return (
    <section className=" gap-4 bg-neutral-200 h-full grid ">
      <div className="fixed top-2 left-2 z-10 p-2 gap-1 flex flex-col bg-secondary-50/70 backdrop-blur-sm rounded-xl">
        {Object.keys(extras).map((extra) => (
          <Switch
            size="sm"
            key={extra}
            label={formatString(extra)}
            checked={extras[extra]}
            onChange={() =>
              setExtras((prev) => ({ ...prev, [extra]: !prev[extra] }))
            }
          >
            {extra}
          </Switch>
        ))}
        {/* <Image width={100} height={100} src="/map/logo.png" alt="logo" /> */}
        {selectedStop}
      </div>
      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        {extras.hasBuildings && <MlFillExtrusionLayer {...exclusionArgs} />}
        {linesData.map((line) => (
          <Line
            seeElevation={extras.hasElevation}
            line={line}
            key={line.id}
            isSelected={selectedLine?.id === line.id || !selectedLine}
            setSelectedLine={setSelectedLine}
          />
        ))}
        <Stops stops={metroStops} setSelectedStop={setSelectedStop} />
        <MapLibreMap
          options={{
            center: { lat: 41.390205, lng: 2.154007 },
            style: "/map/schema.json",
            zoom: 10,
          }}
          style={{
            minWidth: "100%",
            height: "100%",
          }}
        />

        <div className="hidden md:flex">
          <MlNavigationTools />
        </div>
      </div>
    </section>
  );
};

export default Board;
