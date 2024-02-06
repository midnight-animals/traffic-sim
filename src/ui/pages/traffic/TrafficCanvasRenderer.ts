const debug = false;
import { uniqueId } from "lodash-es";
import { Canvas2DShapes } from "../../../library/canvas/Canvas2DShapes";
import { CarBehavior } from "./carModules/CarBehavior";
import { CarService } from "./carModules/CarService";
import {
  CAR_ACCELERATION,
  CAR_GAP,
  CAR_WIDTH,
  getCarHeight
} from "./carModules/carHelpers";
import { ICar } from "./carModules/carTypes";
import {
  numOfLanes,
  getLaneRect,
  roadSetup,
  getCenterOfCarInLane
} from "./roadModules/roadhelpers";
import { RoadConfig } from "./trafficTypes";

const debugFlags = {
  showAxis: true,
  carCoords: true
};

let lastDrawTime = 0; // When the last frame was drawn
// const fps = 1;
const fps = debug ? 0.00001 : 30;

/**
 * If enough time has elapsed, draw the next frame
 */
function getCanRender(): boolean {
  const now = Date.now();
  const elapsed = now - lastDrawTime;
  let can = false;
  if (elapsed > 1000 / fps) {
    lastDrawTime = now - (elapsed % (1000 / fps));
    can = true;
  }
  return can;
}

/**
 * ____________________ <-- lane top
 *
 *  -   -    -    -   -
 * ____________________ <-- lane bottom
 */

export class TrafficCanvasRenderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private canvas2DShapes: Canvas2DShapes;
  private carService: CarService;

  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.canvas2DShapes = new Canvas2DShapes(this.context);
    this.carService = new CarService(this.canvas);

    this.generateTrafficCanvas();
    this.drawRoad();
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.drawRoad();
  }

  private drawRoad(): void {
    const rect = this.canvas.getBoundingClientRect();
    for (let lane = 0; lane < numOfLanes; lane++) {
      const laneRect = getLaneRect(this.canvas, lane);
      const laneHeight = laneRect.bottom;
      this.canvas2DShapes.drawLine([0, laneHeight], [rect.width, laneHeight]);
    }

    if (debugFlags.showAxis) {
      const steps = 50;
      for (let tick = 0; tick < rect.width / steps; tick += 1) {
        const step = tick * steps;
        this.canvas2DShapes.drawLine([step, 0], [step, 10]);
        this.context.fillText(step.toString(), step, 20);
      }
    }
  }

  private drawCar(car: ICar) {
    this.context.beginPath();
    this.canvas2DShapes.rect(car.x, car.y, car.width, car.height); // Draw a simple rectangle as a placeholder for the car
    if (debugFlags.carCoords) {
      this.context.fillText(car.x.toString(), car.x, car.y);
    }
    this.context.fill();
  }

  private genrateCarsForLaneArray(laneIndex: number, numOfCars: number) {
    const carArray: ICar[] = [];

    const laneRect = getLaneRect(this.canvas, laneIndex);
    const carHeight = getCarHeight(laneRect);
    const centerOfCarInLane = getCenterOfCarInLane(laneIndex, laneRect);

    for (let index = 0; index < numOfCars; index++) {
      const x = (CAR_WIDTH + CAR_GAP) * index;
      const car: ICar = {
        id: uniqueId(),
        x: x,
        y: centerOfCarInLane,
        width: CAR_WIDTH,
        height: carHeight,
        speed: CAR_ACCELERATION,
        lane: laneIndex,
        behavior: null
      };
      car.behavior = new CarBehavior();
      carArray.push(car);
    }
    return carArray;
  }

  private generateTrafficCanvas() {
    const cars: ICar[] = [];
    roadSetup.lanes.forEach((lane, laneIndex) => {
      const generated = this.genrateCarsForLaneArray(laneIndex, lane.cars);
      cars.push(...generated);
    });
    /* prettier-ignore */ console.log('>>>> _ >>>> ~ cars:', cars);
    const roadConfig: RoadConfig = {
      lanes: roadSetup.lanes,
      cars
    };

    // Function to update the animation
    const render = () => {
      const canRender = getCanRender();
      if (canRender) {
        this.clear();
        cars.forEach((car) => {
          this.carService.move(car, roadConfig);
          this.drawCar(car);
        });
      }

      window.requestAnimationFrame(render); // Call the update function again on the next frame
    };

    render(); // Start the animation
  }
}
