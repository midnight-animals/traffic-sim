import { VehicleBehavior } from "./VehicleBehavior";

export interface ICar extends Partial<DOMRect> {
  id: string;
  lane: number;
  speed: number;
  /**
   * Which lane to change to, else `null`
   */
  wantToChangeLane?: number;
  behavior: VehicleBehavior;
}

export interface IObstacle extends Partial<DOMRect> {
  id: string;
  lane: number;
}
