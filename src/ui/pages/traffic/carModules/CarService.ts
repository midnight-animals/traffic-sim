import { getCenterOfCarInLane, getLaneRect } from "../roadModules/roadhelpers";
import { RoadConfig } from "../trafficTypes";
import { CHANGE_LANE_SPEED } from "./carHelpers";
import { ICar } from "./carTypes";

export class CarService {
  private context: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
  }

  // Function to update the position of a car
  accelerate(car: ICar): void {
    car.x += car.speed;
    if (car.x > this.canvas.width) {
      car.x = -20; // Reset the car's position to the start when it reaches the end of the canvas
    }
  }

  slowDown(car: ICar): void {
    throw new Error("Method not implemented.");
  }

  move(car: ICar, roadConfig: RoadConfig): void {
    this.accelerate(car);
    // car.behavior.wantsToChangeLane() && this.changeLane(car, roadConfig);
    car.behavior.wantsToChangeLane();
    const toLane = this.getLaneToChangeTo(car, roadConfig);
    if (this.canChangeLanes(car, toLane, roadConfig.cars))
      if (car.behavior.isChangingLanes) {
        this.changeLanes(car, toLane);
      }
  }

  /**
   * TODO:
   * - check if `to` lane exists
   */
  canChangeLanes(car: ICar, toLane: number, cars: ICar[]): boolean {
    /* prettier-ignore */ console.log('>>>> _ >>>> ~ cars:', cars);
    return false;
  }

  changeLanes(car: ICar, to: number): void {
    const laneRect = getLaneRect(this.canvas, to);
    const center = getCenterOfCarInLane(to, laneRect);
    const sign = car.lane < to ? 1 : -1;

    if (sign > 0) {
      if (car.y >= center) {
        car.lane = to;
        car.behavior.setIsChangingLanes(false);
        return; // Already in the correct lane
      }
    } else {
      if (car.y <= center) {
        car.lane = to;
        car.behavior.setIsChangingLanes(false);
        return; // Already in the correct lane
      }
    }

    car.y += CHANGE_LANE_SPEED * sign;

    if (car.y > this.canvas.height) {
      car.y = -20; // Reset the car's position to the start when it reaches the end of the canvas
    }
  }

  getLaneToChangeTo(car: ICar, roadConfig: RoadConfig): number {
    const currentLane = car.lane;
    const numOfLanes = roadConfig.lanes.length;
    // Cases at borders
    if (currentLane === numOfLanes) {
      return currentLane - 1;
    } else if (currentLane === 0) {
      return 1;
    }

    return 0;
  }
}
