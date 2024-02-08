import { Rectangle } from "pixi.js";
import { Vehicle } from "./Vehicle";
import { VehicleType } from "./vehicleTypes";

export class VehicleBuilder {
  type: VehicleType;
  rect = new Rectangle(0, 0, 100, 100);
  speed = 0;

  setType(type: VehicleType): VehicleBuilder {
    this.type = type;
    return this;
  }

  setSpeed(speed: number): VehicleBuilder {
    this.speed = speed;
    return this;
  }

  setRect(rect: Rectangle): VehicleBuilder {
    this.rect = rect;
    return this;
  }

  build(): Vehicle {
    this.checkField("type");
    this.checkField("rect");
    this.checkField("speed");

    return new Vehicle(this.type, this.rect, this.speed);
  }

  public checkField(fieldName: keyof typeof VehicleBuilder.prototype) {
    if (this[fieldName] == null) {
      throw new Error(`Missing ${fieldName} for Vehicle`);
    }
  }
}
