import { RegionOptions, SizeOptions } from "../types/sites";

export const REGION_OPTIONS: RegionOptions = {
  "US - New York 1": {
    value: "NYC1"
  },
  "US - New York 2": {
    value: "NYC2"
  },
  "US - San Francisco": {
    value: "SFO2"
  },
  "CA - Toronto": {
    value: "TOR1"
  },
  "EU - Amsterdam": {
    value: "AMS3"
  },
  "EU - Frankfurt": {
    value: "FRA1"
  },
  "UK - London": {
    value: "LON1"
  },
  "ASIA - Singapore": {
    value: "SGP1"
  },
  "SE ASIA - Bangalore": {
    value: "BLR1"
  }
};

export const SIZE_OPTIONS: SizeOptions = {
  Small: {
    value: "1gb",
    price: 10
  },
  Medium: {
    value: "2gb",
    price: 20
  },
  Large: {
    value: "4gb",
    price: 40
  },
  Maximum: {
    value: "8gb",
    price: 80
  }
};

export default {
  REGION_OPTIONS,
  SIZE_OPTIONS
};
