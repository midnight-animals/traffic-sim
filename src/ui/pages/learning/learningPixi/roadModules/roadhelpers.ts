import { getCarHeight } from "../../../traffic/carModules/carHelpers";
import { numOfLanes } from "../roadObjectModules/roadSetup";

export function getLaneRect(canvas: HTMLCanvasElement, lane: number): DOMRect {
  if (lane < 0) console.warn("[Warn] Lane should be greater or equal than 0");

  const rect = canvas.getBoundingClientRect().toJSON();
  const top = calcLaneBorders(lane);
  const bottom = calcLaneBorders(lane + 1);
  const height = bottom - top;

  const laneRect = { ...rect, top, bottom, height };
  return laneRect;

  /**
   * ____________________ <-- lane top
   *
   *  -   -    -    -   -
   * ____________________ <-- lane bottom
   */
  function calcLaneBorders(lane: number) {
    return (rect.height / numOfLanes) * (lane - 1);
  }
}

export function getCenterOfCarInLane(
  laneIndex: number,
  laneRect: DOMRect
): number {
  const carHeight = getCarHeight(laneRect);
  return laneRect.height / 2 - carHeight / 2 + laneIndex * laneRect.height;
}
