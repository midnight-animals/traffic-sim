import { inject } from "aurelia";

import "./traffic.scss";
import { TrafficController } from "./traffic.controller";

@inject()
export class Traffic {
  message = "traffic";
  private mouseX = 0;
  private mouseY = 0;

  constructor(private trafficController: TrafficController) {}

  attached(): void {
    this.trafficController.addMouseTracker(this.displayMouseCoords);
  }

  private displayMouseCoords = (x: number, y: number) => {
    if (!this) return;
    this.mouseX = x;
    this.mouseY = y;
  };
}
