export enum LineNameEnum {
  L1 = "L1",
  L2 = "L2",
}
export type LineName = keyof typeof LineNameEnum;

export interface MetadataType {
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
  metadata: MetadataType;
}