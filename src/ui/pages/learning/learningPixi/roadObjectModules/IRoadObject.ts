import { Rectangle } from "pixi.js";
import { Position } from "../../../../../library/canvas/canvasTypes";

export abstract class IRoadObject {
  type: string;
  position: Position;
  rect: Rectangle;
}
