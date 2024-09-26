export enum LineNameEnum {
  L1 = "L1",
  L2 = "L2",
  L3 = "L3",
  L4 = "L4",
  L5 = "L5",
  L6 = "L6",
  L7 = "L7",
  L8 = "L8",
  L9 = "L9",
  L10 = "L10",
  L11 = "L11",
  L12 = "L12",
}
export type LineName = keyof typeof LineNameEnum;

export interface LineMetadata {
  title: LineName;
  subtitle: string;
  transport?: string;
  color: string;
  distance: number;
  dateTime: string;
  timeWalking: string;
  time: string;
  velocity: number;
}

export interface LineType {
  id: LineName;
  gpx: string;
  metadata: LineMetadata;
}
