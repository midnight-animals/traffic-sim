export const CAR_HEIGHT = 20;
export const CAR_HEIGHT_FACTOR = 0.3;
export const CAR_GAP = 30;
export const CAR_WIDTH = 50;
export const CHANGE_LANE_SPEED = 3;

export function getCarHeight(laneRect: DOMRect) {
  return CAR_HEIGHT || laneRect.height * CAR_HEIGHT_FACTOR;
}
