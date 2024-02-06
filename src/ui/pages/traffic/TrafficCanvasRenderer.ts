import { Canvas2DShapes } from "../../../library/canvas/Canvas2DShapes";
import { getCarHeight, getCenterOfCarInLane } from "./carModules/carHelpers";
import { ICar } from "./carModules/carTypes";

const debug = false;
const debugFlags = {
  showAxis: true,
  carCoords: true
};

let lastDrawTime = 0; // When the last frame was drawn
// const fps = 1;
const fps = debug ? 0.00001 : 30;
const CAR_GAP = 30;
const CAR_WIDTH = 50;

const roadSetup: RoadSetup = {
  lanes: [
    {
      cars: 1
    },
    {
      cars: 0
    }
  ]
};
const numOfLanes = roadSetup.lanes.length;

interface Lane {
  cars?: number;
}

interface RoadSetup {
  lanes: Lane[];
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
  canvas2DShapes: Canvas2DShapes;

  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.canvas2DShapes = new Canvas2DShapes(this.context);

    this.generateTrafficCanvas();
    this.drawRoad();
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.drawRoad();
  }

  private drawRoad(): void {
    const rect = this.canvas.getBoundingClientRect();
    for (let lane = 1; lane < numOfLanes; lane++) {
      const laneRect = this.getLaneRect(lane);
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

  private getLaneRect(lane: number): DOMRect {
    if (lane <= 0) console.warn("[Warn] Lane should be greater than 0");

    const rect = this.canvas.getBoundingClientRect().toJSON();
    const top = calcLaneBorders(lane - 1);
    const bottom = calcLaneBorders(lane);
    const height = bottom - top;

    const laneRect = { ...rect, top, bottom, height };
    return laneRect;

    /**
     * ____________________ <-- lane top
     *
     *  -   -    -    -   -
     * ____________________ <-- lane bottom
     */
    function calcLaneBorders(lane: number) {
      return (rect.height / numOfLanes) * lane;
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

    const laneRect = this.getLaneRect(laneIndex);
    const carHeight = getCarHeight(laneRect);
    const centerOfCar = getCenterOfCarInLane(laneIndex, laneRect);

    for (let index = 0; index < numOfCars; index++) {
      const x = (CAR_WIDTH + CAR_GAP) * index;
      const car: ICar = {
        x: x,
        y: centerOfCar,
        width: CAR_WIDTH,
        height: carHeight,
        speed: 3
      };
      carArray.push(car);
    }
    return carArray;
  }

  private getCanRender(): boolean {
    const now = Date.now();
    const elapsed = now - lastDrawTime;
    let can = false;
    if (elapsed > 1000 / fps) {
      lastDrawTime = now - (elapsed % (1000 / fps));
      can = true;
    }
    return can;
  }

  private generateTrafficCanvas() {
    const cars: ICar[] = [];
    roadSetup.lanes.forEach((lane, laneIndex) => {
      const generated = this.genrateCarsForLaneArray(laneIndex + 1, lane.cars);
      cars.push(...generated);
    });

    // Function to update the position of a car
    const updateCar = (car) => {
      car.x += car.speed;
      if (car.x > this.canvas.width) {
        car.x = -20; // Reset the car's position to the start when it reaches the end of the canvas
      }
    };

    // Function to update the animation
    const render = () => {
      const canRender = this.getCanRender();

      // If enough time has elapsed, draw the next frame
      if (canRender) {
        this.clear();

        cars.forEach((car) => {
          updateCar(car);
          this.drawCar(car);
        });
      }

      window.requestAnimationFrame(render); // Call the update function again on the next frame
    };

    render(); // Start the animation
  }
}
