import { CarBehavior } from "./CarBehavior";

export interface ICar extends Partial<DOMRect> {
  id: string;
  speed: number;
  lane: number;
  /**
   * Which lane to change to, else `null`
   */
  wantToChangeLane?: number;
  behavior: CarBehavior;
}
