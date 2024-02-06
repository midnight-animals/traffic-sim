import { inject } from "aurelia";

import "./traffic.scss";
import { MouseService } from "./MouseService";
import { cloneDeep } from "lodash-es";
import { TrafficCanvasRenderer } from "./TrafficCanvasRenderer";

@inject()
export class Traffic {
  private mouseX = 0;
  private mouseY = 0;
  private mousePath = [];
  private canvasRef: HTMLCanvasElement;

  constructor(
    private mouseService: MouseService,
    private trafficCanvasRenderer: TrafficCanvasRenderer
  ) {}

  attached(): void {
    this.mouseService.addMouseTracker((x: number, y: number, mousePath) => {
      if (!this) return;
      this.mouseX = x;
      this.mouseY = y;
      this.mousePath = cloneDeep(mousePath);
    });

    this.trafficCanvasRenderer.generateTrafficCanvas(this.canvasRef);
  }
}
