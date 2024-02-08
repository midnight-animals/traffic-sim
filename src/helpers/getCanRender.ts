const debug = true;

let lastDrawTime = 0; // When the last frame was drawn
// const fps = 1;
const fps = debug ? 0.00001 : 30;

/**
 * If enough time has elapsed, draw the next frame
 */
export function getCanRender(): boolean {
  const now = Date.now();
  const elapsed = now - lastDrawTime;
  let can = false;
  if (elapsed > 1000 / fps) {
    lastDrawTime = now - (elapsed % (1000 / fps));
    can = true;
  }
  return can;
}
