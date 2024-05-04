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
  CODI_CAPA: string;
  ED50_COORD_X?: number;
  ED50_COORD_Y?: number;
  EQUIPAMENT: string;
  DISTRICTE?: number;
  BARRI?: number;
  NOM_DISTRICTE: string;
  NOM_BARRI: string;
}
