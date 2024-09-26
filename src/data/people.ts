import { LineName } from "../types/types";
import { getTotalkmPerUser } from "../util/get-info";
import peopleJson from "./people/people.json?raw";

export interface People {
  id: number;
  name: string;
  surnames: string;
  lines_done: Linesdone[];
  avatar: string;
}

export interface Linesdone {
  name: LineName;
  percent: number;
}

export const people: People[] = JSON.parse(peopleJson);
export const peopleByKm = people.sort((a, b) => {
  return getTotalkmPerUser(b.surnames) - getTotalkmPerUser(a.surnames);
});
