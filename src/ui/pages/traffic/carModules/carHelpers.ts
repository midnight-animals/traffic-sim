const CAR_HEIGHT = 20;
const CAR_HEIGHT_FACTOR = 0.3;

export function getCenterOfCarInLane(laneIndex: number, laneRect: DOMRect) {
  const carHeight = getCarHeight(laneRect);
  return (
    laneRect.height / 2 - carHeight / 2 + (laneIndex - 1) * laneRect.height
  );
}

export function getCarHeight(laneRect: DOMRect) {
  return CAR_HEIGHT || laneRect.height * CAR_HEIGHT_FACTOR;
}
