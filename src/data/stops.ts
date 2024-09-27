import { RawStop, StopData } from "../types/stops";
import { LineName } from "../types/types";
import stopsJson from "./geojson/stops.geojson?raw";

export interface Linesdone {
  name: LineName;
  percent: number;
}

export const rawStops: RawStop[] = JSON.parse(stopsJson).features;

export const stops: StopData[] = rawStops.map((f) => {
  return {
    name: f.properties.stop_name,
    lines: f.properties.line ?? [],
    district: f.properties.nom_districte,
    neighborhood: f.properties.nom_barri,
    coordinates: f.geometry.coordinates,
  };
});
