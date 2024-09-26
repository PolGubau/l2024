import { linesData, stops } from "../data/lines";
import { StopFeatures } from "../types/stops";
import { LineName, LineType } from "../types/types";

export const getStopInfo = (stop: string): StopFeatures | null => {
  return stops.features.find((s) => s.properties.stop_name === stop) ?? null;
};

export const getLineInfo = (lineName: LineName): LineType | null => {
  return (
    linesData.find((l) => {
      return l.id === lineName;
    }) ?? null
  );
};

const getImage = ()