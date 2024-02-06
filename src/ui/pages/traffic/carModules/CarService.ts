export abstract class ICarService {
  abstract canChangeLanes(from: number, to: number): boolean;
  abstract changeLanes(to: number): boolean;
}

export class CarService implements ICarService {
  canChangeLanes(from: number, to: number): boolean {
    throw new Error("Method not implemented.");
  }
  changeLanes(to: number): boolean {
    throw new Error("Method not implemented.");
  }
}
