import "./traffic.scss";

export class TrafficController {
  // public init() {}

  public addMouseTracker(callback: (x: number, y: number) => void): void {
    document.addEventListener("mousemove", (event) => {
      const x = event.x;
      const y = event.y;
      callback(x, y);
    });
  }
}
