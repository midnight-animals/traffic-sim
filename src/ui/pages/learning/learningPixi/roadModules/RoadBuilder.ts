export interface ILane {
  cars?: number;
  obstacles?: number;
}

interface IRoad {
  lanes: ILane[];
}

export class RoadBuilder {}
