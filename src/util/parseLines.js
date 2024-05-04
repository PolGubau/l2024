// node function to get gpx and return geojsons with the same names
// use toGeoJson to convert gpx to geojson

import { readFileSync, readdirSync, writeFileSync } from "fs";
import toGeoJSON from "./toGeoJSON.js";
const inputDir = "src/data/gpx";

function parseGPX(gpx) {
  const domParser = new DOMParser();
  const gpxDoc = domParser.parseFromString(gpx, "application/xml");
  const parsedGpx = toGeoJSON.gpx(gpxDoc);
  // copy to clipboard
  const stringified = JSON.stringify(parsedGpx);
  navigator.clipboard.writeText(stringified);
  console.log(stringified);
  return parsedGpx;
}

const files = readdirSync(inputDir);

for (const file of files) {
  const gpx = readFileSync(`${inputDir}/${file}`, "utf8");
  const geojson = parseGPX(gpx);
  writeFileSync(
    `src/data/geojson2/${file.replace(".gpx", ".geojson")}`,
    JSON.stringify(geojson)
  );
}
