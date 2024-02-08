import { VehicleBuilder } from "../../src/ui/pages/learning/learningPixi/roadObjectModules/vehicles/VehicleBuilder";

describe("VehicleBuilder", () => {
  const vehicleBuilder = new VehicleBuilder();
  describe("VehicleBuilder", () => {
    it("Minimal", () => {
      vehicleBuilder.type = "car";
      const result = vehicleBuilder.build();
      result; /*?*/
    });
    it("Car", () => {
      vehicleBuilder.type = "car";
      const result = vehicleBuilder.build();
      result; /*?*/
    });
  });
});
