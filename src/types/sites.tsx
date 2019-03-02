export type RegionValue =
  | "NYC1"
  | "NYC2"
  | "SFO2"
  | "AMS3"
  | "TOR1"
  | "SGP1"
  | "LON1"
  | "FRA1"
  | "BLR1";

export interface RegionOption {
  value: RegionValue;
}
export interface RegionOptions {
  [RegionLabel: string]: RegionOption;
}

export type SizeValue = "512mb" | "1gb" | "2gb" | "4gb" | "8gb";

export interface SizeOption {
  value: SizeValue;
  price: number;
}

export interface SizeOptions {
  [SizeLabel: string]: SizeOption;
}
