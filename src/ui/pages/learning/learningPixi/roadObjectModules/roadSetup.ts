import { RoadSetup } from "../../../traffic/trafficTypes";

export const roadSetup: RoadSetup = {
  lanes: [
    {
      cars: 0,
      obstacles: 3
    },
    {
      cars: 1
    }
  ]
};
export const numOfLanes = roadSetup.lanes.length;
