import { MouseCoords, MousePath } from "../../../types/mouseTypes";
import "./traffic.scss";
import { throttle } from "lodash";

const throttleTime = 800;

abstract class MouseServiceInterface {
  abstract mousePath: MouseCoords[];
  abstract mousePathHistory: MousePath[];

  public abstract addMouseTracker(
    callback: (x: number, y: number) => void
  ): void;

  public abstract addMouseHistory(coords: MouseCoords): void;
}

export class MouseService implements MouseServiceInterface {
  mousePath: MouseCoords[] = [];
  mousePathHistory: MousePath[] = [];

  public addMouseTracker(
    callback: (x: number, y: number, coords: MousePath) => void,
    container?: HTMLElement
  ): void {
    const rect = container?.getBoundingClientRect();
    document.addEventListener("mousemove", (event) => {
      const { x, y } = event;
      const adjustedX = x - (rect?.left || 0);
      const adjustedY = y - (rect?.top || 0);

      const coords: MouseCoords = [adjustedX, adjustedY];
      this.addMouseHistory(coords);

      callback(adjustedX, adjustedY, this.mousePath);
    });
  }

  public addMouseHistory = throttle((coords) => {
    this.mousePath.push(coords);
  }, throttleTime);
}
