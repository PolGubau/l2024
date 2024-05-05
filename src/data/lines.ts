import { LineType } from "../types/types";
import line1 from "./geojson/L1.geojson?raw";
import line2 from "./geojson/L2.geojson?raw";
import line3 from "./geojson/L3.geojson?raw";
import line4 from "./geojson/L4.geojson?raw";
import line11 from "./geojson/L11.geojson?raw";
import stopsData from "./geojson/stops.geojson?raw";
import toGeoJSON from "../util/toGeoJSON";
import { Stops } from "../types/stops";

//
export const linesData: LineType[] = [
  {
    id: "L1",
    gpx: line1,
    metadata: {
      title: "L1",
      transport: "metro",
      subtitle: "Hospital de Bellvitge / Fondo",
      color: "#CB2508",
      distance: 29.64,
      timeWalking: "06:56:45",
      velocity: 4.2,
      dateTime: "2024-02-03T09:44:01.928Z",
      time: "04:42:45",
    },
  },
  {
    id: "L2",
    gpx: line2,
    metadata: {
      title: "L2",
      subtitle: "Paral·lel / Badalona Pompeu Fabra",
      timeWalking: "04:04:00",
      distance: 17.18,
      transport: "metro",
      color: "#90278E",
      velocity: 4.2,

      dateTime: "2024-02-24T10:14:04.387Z",
      time: "04:42:45",
    },
  },
  {
    id: "L3",
    gpx: line3,
    metadata: {
      title: "L3",
      subtitle: "L3 Zona Universitària / Trinitat Nova",
      timeWalking: "03:27:00",
      distance: 18.81,
      transport: "metro",
      color: "#067634",
      velocity: 3.8,

      dateTime: "2024-04-06T11:14:04.387Z",
      time: "04:42:45",
    },
  },
  {
    id: "L4",
    gpx: line4,
    metadata: {
      title: "L4",
      subtitle: "Paral·lel / Badalona Pompeu Fabra",
      timeWalking: "04:04:00",
      distance: 17.18,
      transport: "metro",
      color: "#ffc10e",
      velocity: 4.2,

      dateTime: "2024-04-27T10:14:04.387Z",
      time: "04:17:45",
    },
  },
  {
    id: "L11",
    gpx: line11,
    metadata: {
      title: "L11",
      subtitle: "Trinitat Nova / Can Cuiàs",
      timeWalking: "04:04:00",
      distance: 17.18,
      transport: "metro",
      color: "#9ed84c",
      velocity: 4.2,

      dateTime: "2024-04-06T10:14:04.387Z",
      time: "01:05:00",
    },
  },
];

export function parseGPX(gpx: string) {
  const domParser = new DOMParser();
  const gpxDoc = domParser.parseFromString(gpx, "application/xml");
  const parsedGpx = toGeoJSON.gpx(gpxDoc);
  // copy to clipboard
  const stringified = JSON.stringify(parsedGpx);
  navigator.clipboard.writeText(stringified);
  console.log(stringified);
  return parsedGpx;
}

export const stops = JSON.parse(stopsData) as Stops;
