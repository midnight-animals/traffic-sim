import "./traffic.scss";
import { throttle } from "lodash-es";

const throttleTime = 800;

type MouseCords = [x: number, y: number];
type MousePath = MouseCords[];

abstract class MouseServiceInterface {
  abstract mousePath: MouseCords[];
  abstract mousePathHistory: MousePath[];

  public abstract addMouseTracker(
    callback: (x: number, y: number) => void
  ): void;

  public abstract addMouseHistory(coords: MouseCords): void;
}

export class MouseService implements MouseServiceInterface {
  mousePath: MouseCords[] = [];
  mousePathHistory: MousePath[] = [];

  public addMouseTracker(
    callback: (x: number, y: number, coords: MousePath) => void
  ): void {
    document.addEventListener("mousemove", (event) => {
      const x = event.x;
      const y = event.y;

      const coords: MouseCords = [x, y];
      this.addMouseHistory(coords);

      callback(x, y, this.mousePath);
    });
  }

  public addMouseHistory = throttle((coords) => {
    this.mousePath.push(coords);
  }, throttleTime);
}
