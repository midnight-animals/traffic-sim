import { ICar } from "./carModules/carTypes";

export interface Lane {
  cars?: number;
}

export interface RoadSetup {
  lanes: Lane[];
}

export interface RoadConfig {
  lanes: RoadSetup["lanes"];
  cars: ICar[];
}
