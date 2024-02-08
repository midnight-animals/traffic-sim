import * as PIXI from "pixi.js";
import { getCanRender } from "../../../../helpers/getCanRender";
import { Pixi2d } from "../../../../library/canvas/Pixi2d";

export class LearningPixi {
  LearningPixi = "LearningPixi";

  attached() {
    const app = new PIXI.Application({
      background: "#1099bb",
      resizeTo: window
    });

    const pixi2d = new Pixi2d(app);

    document.body.appendChild(app.view as any);

    app.ticker.add((delta) => {
      const canRender = getCanRender();
      if (canRender) {
        pixi2d.drawLine([0, 0], [100, 100]);
        console.log(delta);
      }
    });
  }
}
