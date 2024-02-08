import * as PIXI from "pixi.js";
import { MouseCoords } from "../../types/mouseTypes";

const defaultColor = "black";

export class Pixi2d {
  constructor(private app: PIXI.Application<PIXI.ICanvas>) {}

  drawLine(
    start: MouseCoords,
    end: MouseCoords,
    color = defaultColor,
    lineWidth = 1
  ): void {
    const line = new PIXI.Graphics();
    const [startX, startY] = start;
    const [endX, endY] = end;
    line.lineStyle(lineWidth, color, 1); // Set line style (thickness, color, alpha)
    line.moveTo(startX, startY); // Move the "pen" to the starting point
    line.lineTo(endX, endY); // Draw a line to the ending point
    this.app.stage.addChild(line); // Add the line to the stage
  }

  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = defaultColor
  ): void {
    // this.context.save();
    // this.context.fillStyle = color;
    // this.context.fillRect(x, y, width, height);
    // this.context.restore();
  }

  drawBox(
    x: number,
    y: number,
    width: number,
    height: number,
    borderColor: string,
    borderWidth: number
  ): void {
    // this.context.beginPath();
    // this.context.rect(x, y, width, height);
    // this.context.lineWidth = borderWidth;
    // this.context.strokeStyle = borderColor;
    // this.context.stroke();
  }

  drawCircle(
    x: number,
    y: number,
    radius: number,
    borderColor: string,
    borderWidth: number
  ): void {
    // this.context.beginPath();
    // this.context.arc(x, y, radius, 0, 2 * Math.PI);
    // this.context.lineWidth = borderWidth;
    // this.context.strokeStyle = borderColor;
    // this.context.stroke();
  }
}
