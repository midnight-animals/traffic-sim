import { ICar } from "./carTypes";

/**
 * TODO
 * - Add more behaviors
 *   - change lanes
 *     - if other lane (seems to be) moving faster
 *     - if car in front is moving too slowly
 *     - (if needs to turn)
 */
export class CarBehavior {
  public isAccelerating: boolean;
  public isChangingLanes: boolean;
  public isParking: boolean;

  constructor(private car: ICar) {}

  public setIsAccelerating(is: boolean): void {
    this.isAccelerating = is;
  }
  public setIsChangingLanes(is: boolean): void {
    this.isChangingLanes = is;
  }
  public setIsParking(is: boolean): void {
    this.isParking = is;
  }

  public wantsToAccelerate(): boolean {
    const wants = Math.random() >= 0.95;
    if (wants) {
      this.setIsParking(true);
    }
    return wants;
  }

  public wantsToChangeLane(): boolean {
    const wants = Math.random() >= 0.95;
    if (wants) {
      this.setIsChangingLanes(true);
    }
    return wants;
  }

  public wantsToPark(): boolean {
    const wants = Math.random() >= 0.95;
    if (wants) {
      this.setIsParking(true);
    }
    return wants;
  }
}
