import { LineName } from "./types";

export interface Stops {
  type: string;
  features: StopFeatures[];
}

export interface StopFeatures {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: unknown;
}

export interface Properties {
  line: LineName[];
  stop_name: string;
  districte?: number;
  BARRI?: number;
  nom_districte: string;
  nom_barri: string;
}
