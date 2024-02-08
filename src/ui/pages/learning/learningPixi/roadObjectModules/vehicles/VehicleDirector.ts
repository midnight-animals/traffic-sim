import { VehicleBuilder } from "./VehicleBuilder";
import { carConstants } from "./cars/carConstants";

export class VehicleDirector {
  public constructCar(builder: VehicleBuilder) {
    return builder.setType("car").setRect(carConstants.rect).build();
  }
}
