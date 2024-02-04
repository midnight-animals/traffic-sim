import { inject } from "aurelia";

import "./traffic.scss";
import { MouseService } from "./MouseService";
import { cloneDeep } from "lodash-es";

@inject()
export class Traffic {
  message = "traffic";
  private mouseX = 0;
  private mouseY = 0;
  private mousePath = [];

  constructor(private mouseService: MouseService) {}

  attached(): void {
    this.mouseService.addMouseTracker((x: number, y: number, mousePath) => {
      if (!this) return;
      this.mouseX = x;
      this.mouseY = y;
      this.mousePath = cloneDeep(mousePath);
    });
  }
}
