import { VehicleDirector } from "../../src/ui/pages/learning/learningPixi/roadObjectModules/vehicles/VehicleDirector";
import { VehicleBuilder } from "../../src/ui/pages/learning/learningPixi/roadObjectModules/vehicles/VehicleBuilder";
import { VehicleBehavior } from "../../src/ui/pages/traffic/carModules/VehicleBehavior";

describe("VehicleDirector", () => {
  const vehicleDirector = new VehicleDirector();
  const vehicleBuilder = new VehicleBuilder();
  describe("VehicleDirector", () => {
    it("Car", () => {
      const car = vehicleDirector.constructCar(vehicleBuilder);
      expect(car).toMatchSnapshot();
    });
    it.only("Car with behavior ISSUE-xBqg8BnF", () => {
      const car = vehicleDirector.constructCar(vehicleBuilder);
      const behavior = new VehicleBehavior();
      car.setBehavior(behavior);
      expect(car).toMatchSnapshot();
    });
  });
});
