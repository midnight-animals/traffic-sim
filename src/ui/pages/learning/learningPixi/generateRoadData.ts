import { VehicleBehavior } from "../../traffic/carModules/VehicleBehavior";
import { roadSetup } from "./roadObjectModules/roadSetup";
import { Vehicle } from "./roadObjectModules/vehicles/Vehicle";
import { VehicleBuilder } from "./roadObjectModules/vehicles/VehicleBuilder";
import { VehicleDirector } from "./roadObjectModules/vehicles/VehicleDirector";

const vehicleBuilder = new VehicleBuilder();
const vehicleDirector = new VehicleDirector();
const behavior = new VehicleBehavior();

export function generateRoadData() {
  const car = vehicleDirector.constructCar(vehicleBuilder);
  car.setBehavior(behavior);
  car; /*?*/

  const cars: Vehicle[] = [];
  roadSetup.lanes.forEach((lane, laneIndex) => {
    const generated = this.genrateCarsForLaneArray(laneIndex, lane.cars);
    cars.push(...generated);
  });
}

generateRoadData();
