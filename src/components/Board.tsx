import {
  MapLibreMap,
  MlFillExtrusionLayer,
  MlNavigationTools,
} from "@mapcomponents/react-maplibre";
import { Line } from "./Line";
import { linesData } from "../data/lines";
import { LineType } from "../types";
import { useState } from "react";
import { TbLayout } from "react-icons/tb";

import { Sidebar, SidebarItem } from "pol-ui";
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
  const [sidebarOpenend, setSidebarOpenend] = useState(false);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  return (
    <section className="flex gap-4 bg-neutral-200 h-full md:flex-row flex-col">
      <Sidebar
        collapsable
        collapsed={!sidebarOpenend}
        toggle={() => setSidebarOpenend(!sidebarOpenend)}
      >
        <SidebarItem
          disabled={!selectedLine}
          onClick={() => setSelectedLine(null)}
          icon={TbLayout}
        >
          All
        </SidebarItem>
        {linesData.map((line) => (
          <SidebarItem
            disabled={selectedLine?.id === line.id}
            onClick={() => setSelectedLine(line)}
            key={line.id}
          >
            {line.metadata.title}
          </SidebarItem>
        ))}
      </Sidebar>

      {selectedStop && selectedLine ? (
        <img
          src={`/images/${selectedLine?.id}/${selectedStop}.jpg`}
          alt={selectedStop ?? "Selecciona una parada"}
          className="w-full h-96 bg-red-300 object-cover rounded-xl object-center"
        />
      ) : (
        <div className="w-full h-96 bg-neutral-100 rounded-xl">
          Selecciona una parada
        </div>
      )}

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
