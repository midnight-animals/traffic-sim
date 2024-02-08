import { TrafficCanvasRenderer } from "../src/ui/pages/traffic/TrafficCanvasRenderer";
import { mockWindow } from "./testHelpers/mockWindow";

describe("TrafficCanvasRenderer", () => {
  const trafficCanvasRenderer = new TrafficCanvasRenderer();

  beforeAll(() => {
    mockWindow();
    trafficCanvasRenderer.setCanvas(
      window.document.createElement("canvas") as HTMLCanvasElement
    );
  });

  describe("genrateObstaclesForLaneArray", () => {
    test("1 ISSUE-kyj7MfSS", () => {
      const result = trafficCanvasRenderer.genrateObstaclesForLaneArray(0, 2);
      result; /*?*/
      // // expect(result).toMatchSnapshot()
      expect(true).toBeFalsy();
    });
  });
});
