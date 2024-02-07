import { CarBehavior } from "./CarBehavior";

export interface ICar extends Partial<DOMRect> {
  id: string;
  lane: number;
  speed: number;
  /**
   * Which lane to change to, else `null`
   */
  wantToChangeLane?: number;
  behavior: CarBehavior;
}

export interface IObstacle extends Partial<DOMRect> {
  id: string;
  lane: number;
}
