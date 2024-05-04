export interface Line {
  type: string;
  features: GeoJSON.Feature;
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  name: string;
  type: string;
  time: string;
  coordTimes: string[];
}

export interface Geometry {
  type: string;
  coordinates: number[][];
}
