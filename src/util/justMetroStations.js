import json from "../data/geojson/stops.geojson";

const justMetroStations = json.features.filter(
  (feature) => feature.properties.type === "metro_station"
);

// put the new array into a file in the data folder
import { writeFileSync } from "fs";

writeFileSync(
  "src/data/geojson/metro_stations.geojson",
  JSON.stringify(justMetroStations)
);
