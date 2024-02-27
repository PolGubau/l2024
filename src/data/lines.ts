import { LineType } from "../types";
import line1 from "./L1.gpx?raw";
import line2 from "./L2.gpx?raw";

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
];
