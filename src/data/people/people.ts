import { LineName } from "../../types/types";
import peopleJson from "./people.json?raw";

export interface People {
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
