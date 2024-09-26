import { LineName } from "./types";
export interface StopsObject {
  type: string;
  features: RawStop[];
}

export interface RawStop {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Properties {
  line?: LineName[];
  stop_name: string;
  nom_districte: string;
  nom_barri: string;
  stop_id?: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

export interface StopData {
  name: string;
  lines: LineName[];
  district: string;
  neighborhood: string;
  coordinates: number[];
}
