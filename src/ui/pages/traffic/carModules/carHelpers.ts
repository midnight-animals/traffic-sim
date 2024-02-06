export const CAR_HEIGHT = 20;
export const CAR_HEIGHT_FACTOR = 0.3;
export const CAR_GAP = 30;
export const CAR_WIDTH = 50;
export const CAR_ACCELERATION = 3;
export const CHANGE_LANE_SPEED = 3;

/**
 * Cars within range in the front and in the rear = "nearby"
 */
export const NEARBY_VALUE = CAR_WIDTH / 2;

export function getCarHeight(laneRect: DOMRect) {
  return CAR_HEIGHT || laneRect.height * CAR_HEIGHT_FACTOR;
}
