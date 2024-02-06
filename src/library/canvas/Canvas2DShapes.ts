import { MouseCoords } from "../../types/mouseTypes";

/* prettier-ignore */
export abstract class ICanvas2DShapes {
  public abstract drawLine(start: MouseCoords, end: MouseCoords, color: string, lineWidth: number): void;
  public abstract drawRectangle( x: number, y: number, width: number, height: number, color: string): void;
  public abstract drawBox( x: number, y: number, width: number, height: number, borderColor: string, borderWidth: number): void;
  public abstract drawCircle( x: number, y: number, radius: number, borderColor: string, borderWidth: number): void;
}

export class Canvas2DShapes implements ICanvas2DShapes {
  constructor(private context: CanvasRenderingContext2D) {}

  drawLine(
    start: MouseCoords,
    end: MouseCoords,
    color: string,
    lineWidth: number
  ): void {
    this.context.beginPath();
    const [startX, startY] = start;
    const [endX, endY] = end;
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.stroke();
  }

  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  drawBox(
    x: number,
    y: number,
    width: number,
    height: number,
    borderColor: string,
    borderWidth: number
  ): void {
    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.lineWidth = borderWidth;
    this.context.strokeStyle = borderColor;
    this.context.stroke();
  }

  drawCircle(
    x: number,
    y: number,
    radius: number,
    borderColor: string,
    borderWidth: number
  ): void {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.lineWidth = borderWidth;
    this.context.strokeStyle = borderColor;
    this.context.stroke();
  }
}
