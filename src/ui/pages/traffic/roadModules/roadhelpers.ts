import { getCarHeight } from "../carModules/carHelpers";
import { RoadSetup } from "../trafficTypes";

export const roadSetup: RoadSetup = {
  lanes: [
    {
      cars: 2
    },
    {
      cars: 1
    }
  ]
};
export const numOfLanes = roadSetup.lanes.length;

export function getLaneRect(canvas: HTMLCanvasElement, lane: number): DOMRect {
  if (lane <= 0) console.warn("[Warn] Lane should be greater than 0");

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
