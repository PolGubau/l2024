import {
  MapLibreMap,
  MlFillExtrusionLayer,
  MlNavigationTools,
} from "@mapcomponents/react-maplibre";
import { Line } from "./Line";
import { linesData } from "../data/lines";
import { LineType } from "../types";
import { useState } from "react";
import { Button } from "pol-ui";
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
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  return (
    <section className="flex gap-4 bg-neutral-200 p-4  h-full md:flex-row flex-col">
      <div className="md:w-96 md:overflow-hidden p-1 gap-4 flex flex-col">
        <ul className="flex gap-3 md:flex-col w-full overflow-y-auto p-1">
          {linesData.map((line) => (
            <button
              onClick={() => setSelectedLine(line)}
              className={`bg-neutral-50 rounded-xl shadow-lg p-1 pr-3 items-center flex transition-all ${
                selectedLine?.id === line.id ? "bg-neutral-100" : ""
              }`}
              style={{
                backgroundColor:
                  selectedLine?.id === line.id
                    ? line.metadata.color + "33"
                    : undefined,
              }}
              key={line.id}
            >
              <li className="flex justify-normal items-center">
                <div
                  className="w-2 h-[60px] rounded-full mr-4 p-1.5"
                  style={{
                    backgroundColor: line.metadata.color,
                  }}
                ></div>
                <div className="flex flex-col items-start">
                  <h3 className="text-xl "> {line.metadata.title}</h3>
                  <p className="text-xs md:text-sm">{line.metadata.subtitle}</p>
                </div>
              </li>
            </button>
          ))}
        </ul>
        {selectedStop && selectedLine && (
          <img
            src={`/images/${selectedLine?.id}/${selectedStop}.jpg`}
            alt={selectedStop ?? "Select an stop"}
            className="w-full h-96 bg-red-300 object-cover rounded-xl object-center"
          />
        )}
        <Button disabled={!selectedLine} onClick={() => setSelectedLine(null)}>
          Clear
        </Button>
      </div>
      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        <MlFillExtrusionLayer {...args} />

        {linesData.map((line) => (
          <Line
            setSelectedStop={setSelectedStop}
            line={line}
            key={line.id}
            isSelected={selectedLine?.id === line.id || !selectedLine}
            setSelectedLine={setSelectedLine}
          />
        ))}

        <MapLibreMap
          options={{
            center: { lat: 41.390205, lng: 2.154007 },
            style: "/map/schema.json",
            zoom: 11,
          }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
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
