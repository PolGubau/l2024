import { LineName } from "../types/types";
import { getTotalkmPerUser } from "../util/get-info";
import peopleJson from "./people/people.json?raw";

export interface RawPeople {
  id: number;
  name: string;
  surnames: string;
  lines_done: Linesdone[];
  avatar: string;
}

export interface People extends RawPeople {
  kms: number;
  stopsAmount: number;
}

export interface Linesdone {
  name: LineName;
  percent: number;
}

export const rawPeople: RawPeople[] = JSON.parse(peopleJson);

export const people: People[] = rawPeople.map((p) => {
  const stopsAmount = getTotalkmPerUser(p.id);
  const kms = getTotalkmPerUser(p.id);
  return { ...p, stopsAmount, kms };
});
