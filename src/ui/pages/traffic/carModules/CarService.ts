import {
  getCenterOfCarInLane,
  getLaneRect
} from "../../learning/learningPixi/roadModules/roadhelpers";
import { RoadConfig } from "../trafficTypes";
import { CHANGE_LANE_SPEED, NEARBY_VALUE } from "./carHelpers";
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
    const canChange = this.canChangeLanes(car, toLane, roadConfig.cars);
    if (canChange) {
      if (car.behavior.isChangingLanes) {
        this.changeLanes(car, toLane);
      }
    }
  }

  getNearbyCars(targetCar: ICar, cars: ICar[]): ICar[] {
    const nearbyCars = cars.filter((car) => {
      if (car.id === targetCar.id) return false;

      const nearbyRear = Math.abs(targetCar.x - car.x) <= NEARBY_VALUE;
      const frontCar = car.x + car.width;
      const frontTargetCar = targetCar.x + targetCar.width;
      const nearbyFront = Math.abs(frontTargetCar - frontCar) <= NEARBY_VALUE;
      const nearby = nearbyRear || nearbyFront;
      return nearby;
    });
    return nearbyCars;
  }

  /**
   * TODO:
   * - check if `to` lane exists
   */
  canChangeLanes(car: ICar, toLane: number, cars: ICar[]): boolean {
    if (car.lane === toLane) return false;
    if (car.x < 0) return false;
    car.lane; /*?*/
    toLane; /*?*/
    const nearbyCars = this.getNearbyCars(car, cars);
    if (nearbyCars.length === 0) {
      return true;
    }

    const nearbyCarsOnToLane = nearbyCars.filter((car) => car.lane === toLane);
    if (nearbyCarsOnToLane.length === 0) {
      return true;
    }
    // const mapped = cars.map((car) => ({ ...car, behavior: null }));
    // /* prettier-ignore */ console.log('>>>> _ >>>> ~ mapped:', mapped);

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
