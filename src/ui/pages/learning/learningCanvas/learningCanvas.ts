import { observable } from "aurelia";
import { Canvas2DShapes } from "../../../../library/canvas/Canvas2DShapes";
import { MouseCoords } from "../../../../types/mouseTypes";

const defaultColor = "black";

const shapes = ["line", "rectangle", "box", "circle"];

function getXYFromEvent(event: MouseEvent, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = Math.round(event.clientY - rect.top);
  const currentPoint = [x, y] as MouseCoords;
  return currentPoint;
}

export class LearningCanvas {
  private canvasRef: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private backBuffer: HTMLCanvasElement;
  private backBufferContext: CanvasRenderingContext2D;
  private canvas2DShapes: Canvas2DShapes;
  private shapes = shapes;
  private message = "Awaiting command...";
  private previousPoint: MouseCoords | null = null;
  private canvasHistory: ImageData[] = [];

  @observable
  private selectedShape = "line";

  attached() {
    // Main Canvas
    this.canvasRef.style.border = "1px solid black";
    this.canvasRef.height = 600;
    this.canvasRef.width = 600;
    this.context = this.canvasRef.getContext("2d");
    // Back Canvas
    this.backBuffer = document.createElement("canvas");
    this.backBuffer.width = this.canvasRef.width;
    this.backBuffer.height = this.canvasRef.height;
    this.backBufferContext = this.backBuffer.getContext("2d");
    // Canvas Setup
    this.canvas2DShapes = new Canvas2DShapes(this.context);
    this.saveCanvas();
    // Init Methods
    this.addClickListener();
    this.addMoveListener();
    this.addMouseUpListener();
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
  }

  private saveCanvas(): ImageData {
    const canvasState = this.context.getImageData(
      0,
      0,
      this.canvasRef.width,
      this.canvasRef.height
    );
    this.canvasHistory.push(canvasState);
    return canvasState;
  }

  private restoreCanvas(): void {
    console.log("restore");
    const lastCanvasState = this.canvasHistory.pop();
    if (!lastCanvasState) return;
    this.context.putImageData(lastCanvasState, 0, 0);
  }

  private addClickListener() {
    this.canvasRef.addEventListener("mousedown", (event) => {
      const currentPoint = getXYFromEvent(event, this.canvasRef);
      const [x, y] = currentPoint;
      // this.saveCanvas();

      const handleLine = (): void => {
        if (this.previousPoint) {
          /* prettier-ignore */ this.setMessage(`Line: Start at (${this.previousPoint}) and end at (${currentPoint})`);
          this.drawLine(this.previousPoint, currentPoint);
          this.clearPreviousPoint();
        } else {
          /* prettier-ignore */ this.setMessage(`Line: Start point at (${currentPoint})`);
          this.drawLine(currentPoint, [x + 1, y]);
          this.previousPoint = currentPoint;
        }
      };

      if (this.selectedShape === "line") {
        handleLine();
      } else {
        this.clearPreviousPoint();
      }

      switch (this.selectedShape) {
        case "rectangle":
          this.canvas2DShapes.drawRectangle(x, y, 50, 50, defaultColor);
          break;
        case "box":
          this.canvas2DShapes.drawBox(x, y, 50, 50, defaultColor, 1);
          break;
        case "circle":
          // Draw circle
          break;
        default:
          break;
      }
    });
  }

  private addMoveListener() {
    this.canvasRef.addEventListener("mousemove", (event) => {
      if (this.previousPoint) {
        /* prettier-ignore */ this.setMessage(`Line: Start point at (${this.previousPoint}). Waiting for end click ...`);
        const currentPoint = getXYFromEvent(event, this.canvasRef);
        // this.restoreCanvas();
        // this.saveCanvas();
        this.drawLine(this.previousPoint, currentPoint);
      }
    });
  }

  private addMouseUpListener() {
    this.canvasRef.addEventListener("mouseup", (event) => {
      if (this.previousPoint) {
        const currentPoint = getXYFromEvent(event, this.canvasRef);
        // this.restoreCanvas();
        this.drawLine(this.previousPoint, currentPoint);
      }
      this.saveCanvas();
    });
  }

  private setMessage(message: string) {
    this.message = message;
  }

  private clearPreviousPoint(): void {
    this.previousPoint = null;
  }

  private drawLine(start: MouseCoords, end: MouseCoords) {
    this.canvas2DShapes.drawLine(start, end, defaultColor, 1);
  }
}
