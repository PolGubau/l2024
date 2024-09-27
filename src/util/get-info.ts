import { lowerAndNoSpace } from "pol-ui";
import { linesData } from "../data/lines";
import { people, People, rawPeople } from "../data/people";
import { stops } from "../data/stops";
import { StopData } from "../types/stops";
import { LineName, LineType } from "../types/types";

export const getLineInfo = (lineName: LineName): LineType | null => {
  return (
    linesData.find((l) => {
      return l.id === lineName;
    }) ?? null
  );
};

export const sumLinesKm = (lines: LineName[]): number => {
  const float = lines.reduce((acc, l) => {
    const line = getLineInfo(l);
    return acc + (line?.metadata.distance ?? 0);
  }, 0);

  return Math.round(float * 100) / 100;
};

export const sumLinesWithPercent = (
  lines: { name: LineName; percent: number }[]
): number => {
  const float = lines.reduce((acc, l) => {
    const line = getLineInfo(l.name);
    return acc + (line?.metadata.distance ?? 0) * (l.percent / 100);
  }, 0);

  return Math.round(float * 100) / 100;
};

export const getImage = (line: LineName, stop: string): string => {
  return `/images/${line}/${stop}.jpg`;
};
export const getStopInfo = (stop: string): StopData | null => {
  const s =
    stops.find((s) => lowerAndNoSpace(s.name) === lowerAndNoSpace(stop)) ??
    null;
  return s;
};

export const getTotalkmPerUser = (id: number) => {
  const person = rawPeople.find((p) => p.id === id);
  const linesDone = person?.lines_done;
  if (!linesDone) return 0;

  // get the km of these lines
  const kms = sumLinesWithPercent(linesDone);

  // sum all the kms but if the percent is 50% only sum 50% of the km, and so

  return kms;
};

export const getStopsByLine = (line: LineName): number | undefined => {
  const lineInfo = getLineInfo(line);
  return lineInfo?.metadata.stations;
};

export const getLinesByStop = (stop: string): LineName[] => {
  return stops.find((s) => s.name === stop)?.lines ?? [];
};

export const getStopsByLineAndPercent = (lineAndPercent: {
  name: LineName;
  percent: number;
}): number => {
  const stopsAmount = getStopsByLine(lineAndPercent.name);

  // if the percent is 100 return all the stops, if not return the percent of the stops

  const stops = stopsAmount
    ? Math.round((stopsAmount * lineAndPercent.percent) / 100)
    : 0;

  return stops;
};

export const getStopsByLinesAndPercent = (
  linesAndPercent: { name: LineName; percent: number }[]
): number => {
  const stopsByLines = linesAndPercent.reduce((acc, l) => {
    return acc + getStopsByLineAndPercent(l);
  }, 0);
  return stopsByLines;
};

export const getUserStopAmount = (id: number): number => {
  const person = rawPeople.find((p) => p.id === id);
  const linesDone = person?.lines_done;
  if (!linesDone) return 0;

  // get the km of these lines
  const stops = getStopsByLinesAndPercent(linesDone);

  return stops;
};

export const getPeopleByLine = (line: LineName): People[] => {
  return people.filter((p) => {
    return p.lines_done.find((l) => l.name === line);
  });
};


const getStopNamesByLine = (line: LineName): StopData[] => {
   const lineStops = stops.filter((s) => s.lines.includes(line));

  return lineStops;
}


export const getAllImagesByUser = (id: number): string[] => {
  const person = rawPeople.find((p) => p.id === id);
  const linesDone = person?.lines_done;
  if (!linesDone) return [];

  // check each name of the stops of these lines and return the images

  // the url of the image is /images/lineName/stopName.jpg

  const images = linesDone.reduce((acc, l) => {
    const stops = getStopNamesByLine(l.name);
    const images = stops.map((s) => getImage(l.name, s.name));
    return [...acc, ...images];
  }, [] as string[]);

  return images;
};
