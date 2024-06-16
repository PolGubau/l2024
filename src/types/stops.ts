import { LineName } from "./types";

export interface Stops {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: unknown;
}

export interface Properties {
  LINE: LineName[];
  stop_name: string;
  DISTRICTE?: number;
  BARRI?: number;
  NOM_DISTRICTE: string;
  nom_barri: string;
}
