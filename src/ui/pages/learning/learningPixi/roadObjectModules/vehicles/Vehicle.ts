import { Rectangle } from "pixi.js";
import { IRoadObject } from "../IRoadObject";
import { VehicleType } from "./vehicleTypes";
import { VehicleBehavior } from "../../../../traffic/carModules/VehicleBehavior";

export class Vehicle extends IRoadObject {
  public behavior: VehicleBehavior;

  constructor(
    public type: VehicleType,
    public rect: Rectangle,
    public speed: number
  ) {
    super();
  }

  // Add methods for Vehicle class here
  setBehavior(behavior: VehicleBehavior) {
    this.behavior = behavior;
  }
}
