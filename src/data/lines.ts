import { LineType } from "../types/types";
import line1 from "./geojson/L1.geojson?raw";
import line2 from "./geojson/L2.geojson?raw";
import line3 from "./geojson/L3.geojson?raw";
import line4 from "./geojson/L4.geojson?raw";
import line5 from "./geojson/L5.geojson?raw";
import line6 from "./geojson/L6.geojson?raw";
import line7 from "./geojson/L7.geojson?raw";
import line8 from "./geojson/L8.geojson?raw";
import line9 from "./geojson/L9.geojson?raw";
import line10 from "./geojson/L10.geojson?raw";
import line12 from "./geojson/L12.geojson?raw";
import line11 from "./geojson/L11.geojson?raw";

//
export const linesData: LineType[] = [
  {
    id: "L1",
    gpx: line1,
    metadata: {
      title: "L1",
      transport: "metro",
      subtitle: "Hospital de Bellvitge / Fondo",
      color: "#df2937",
      distance: 29.64,
      metro_distance: 20.2,
      stations: 30,
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
      metro_distance: 13.1,
      stations: 18,
      transport: "metro",
      color: "#993c8c",
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
      stations: 26,
      metro_distance: 18.4,
      transport: "metro",
      color: "#3aa83e",
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
      distance: 17.4,
      stations: 22,
      metro_distance: 17.3,
      transport: "metro",
      color: "#ffc10e",
      velocity: 4.2,

      dateTime: "2024-04-27T10:14:04.387Z",
      time: "04:17:45",
    },
  },
  {
    id: "L5",
    gpx: line5,
    metadata: {
      title: "L5",
      subtitle: "Cornellà Centre / Vall d'Hebron",
      timeWalking: "04:04:00",
      distance: 22.24,
      stations: 27,
      metro_distance: 18.9,
      transport: "metro",
      color: "#0177bc",
      velocity: 4.2,

      dateTime: "2024-05-7T10:14:04.387Z",
      time: "04:17:45",
    },
  },
  {
    id: "L6",
    gpx: line6,
    metadata: {
      title: "L6",
      subtitle: "Plaça Catlunya / Sarrià",
      timeWalking: "01:31:00",
      distance: 5.55,
      metro_distance: 4.7,
      stations: 8,
      transport: "metro",
      color: "#7386bc",
      velocity: 3.6,

      dateTime: "2024-05-15T10:14:04.387Z",
      time: "01:39:00",
    },
  },
  {
    id: "L7",
    gpx: line7,
    metadata: {
      title: "L7",
      subtitle: "Plaça Catlunya / Av. Tibidabo",
      timeWalking: "01:39:00",
      distance: 6.09,
      metro_distance: 3.9,
      stations: 7,
      transport: "metro",
      color: "#b16612",
      velocity: 3.7,

      dateTime: "2024-05-15T10:14:04.387Z",
      time: "01:39:00",
    },
  },
  {
    id: "L8",
    gpx: line8,
    metadata: {
      title: "L8",
      subtitle: "Moli Nou / Plaça Espanya",
      timeWalking: "01:39:00",
      distance: 6.09,
      metro_distance: 11.8,
      stations: 11,
      transport: "metro",
      color: "#e579ae",
      velocity: 3.7,

      dateTime: "2024-05-15T10:14:04.387Z",
      time: "01:39:00",
    },
  },
  {
    id: "L9",
    gpx: line9,
    metadata: {
      title: "L9",
      subtitle: "Zona Universitària / Aeroport T1",
      timeWalking: "01:39:00",
      distance: 19.26,
      metro_distance: 15.8 + 11.1,
      stations: 24,
      transport: "metro",
      color: "#f88d00",
      velocity: 3.7,

      dateTime: "2024-05-15T10:14:04.387Z",
      time: "01:39:00",
    },
  },

  {
    id: "L10",
    gpx: line10,
    metadata: {
      stations: 17,
      title: "L10",
      subtitle: "ZAL / Gorg",
      timeWalking: "02:04:00",
      distance: 7.36 + 10,
      metro_distance: 17.1,
      transport: "metro",
      color: "#08a0e5",
      velocity: 3.5,

      dateTime: "2024-04-06T10:14:04.387Z",
      time: "01:05:00",
    },
  },
  {
    id: "L11",
    gpx: line11,
    metadata: {
      title: "L11",
      subtitle: "Trinitat Nova / Can Cuiàs",
      timeWalking: "04:04:00",
      distance: 3.7,
      metro_distance: 2.3,
      stations: 5,
      transport: "metro",
      color: "#b4cd56",
      velocity: 4.2,

      dateTime: "2024-04-06T10:14:04.387Z",
      time: "01:05:00",
    },
  },
  {
    id: "L12",
    gpx: line12,
    metadata: {
      title: "L12",
      subtitle: "Trinitat Nova / Can Cuiàs",
      timeWalking: "04:04:00",
      distance: 0.79,
      metro_distance: 0.6,
      stations: 2,
      transport: "metro",
      color: "#bbb3d7",
      velocity: 4.2,

      dateTime: "2024-04-06T10:14:04.387Z",
      time: "01:05:00",
    },
  },
];
