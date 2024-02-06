import { MouseCoords, MousePath } from "../../../types/mouseTypes";
import "./traffic.scss";
import { throttle } from "lodash-es";

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
    callback: (x: number, y: number, coords: MousePath) => void
  ): void {
    document.addEventListener("mousemove", (event) => {
      const x = event.x;
      const y = event.y;

      const coords: MouseCoords = [x, y];
      this.addMouseHistory(coords);

      callback(x, y, this.mousePath);
    });
  }

  public addMouseHistory = throttle((coords) => {
    this.mousePath.push(coords);
  }, throttleTime);
}
