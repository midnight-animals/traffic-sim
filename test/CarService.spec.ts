import { CarService } from "../src/ui/pages/traffic/carModules/CarService";

function mockWindow() {
  // @ts-expect-error mock window
  global.window = global;
  // @ts-expect-error mock document
  global.document = {
    createElement: jest.fn().mockReturnValue({
      getContext: jest.fn()
    })
  };
}

/**
 * _________________________
 *   [  "1" 11  ]   [  "2" 12  ]
 * ----   ----- -----  -----
 *   [  "3" 21  ]
 * _________________________
 */
const cars_2lanes_2_1 = [
  {
    id: "1",
    x: 0,
    y: 15.5,
    width: 50,
    height: 20,
    speed: 0,
    lane: 0,
    behavior: {} as any
  },
  {
    id: "2",
    x: 80,
    y: 15.5,
    width: 50,
    height: 20,
    speed: 0,
    lane: 0,
    behavior: {} as any
  },
  {
    id: "3",
    x: 0,
    y: 66.5,
    width: 50,
    height: 20,
    speed: 0,
    lane: 1,
    behavior: {} as any
  }
];

describe("CarService", () => {
  let carService: CarService;

  beforeEach(() => {
    // Define window and document for Jest
    mockWindow();
    carService = new CarService(window.document.createElement("canvas"));
  });

  describe("changeLanes", () => {
    test("should change lanes when car is not in the correct lane", () => {
      // carService.changeLanes(car, 2);
    });

    test("should not change lanes when car is already in the correct lane", () => {
      // carService.changeLanes(car, 2);
    });

    test("should reset car position when it reaches the end of the canvas", () => {
      // carService.changeLanes(car, 2);
    });
  });

  describe("canChangeLanes", () => {
    describe("Can change lane", () => {
      test.only("No cars nearby ISSUE-3AFEokbB", () => {
        const car_1_1 = cars_2lanes_2_1[1];
        const result = carService.canChangeLanes(car_1_1, 1, cars_2lanes_2_1);
        const snapshot = {
          car: car_1_1,
          cars: cars_2lanes_2_1,
          result
        };
        expect(snapshot).toMatchSnapshot();
      });
    });

    describe("Cannot change lane", () => {
      test("Car nearby in different lane ISSUE-SlsXBH9D", () => {
        const car_2_1 = cars_2lanes_2_1[2];
        const result = carService.canChangeLanes(car_2_1, 0, cars_2lanes_2_1);
        const snapshot = {
          car: car_2_1,
          cars: cars_2lanes_2_1,
          result
        };
        expect(snapshot).toMatchSnapshot();
      });
    });
  });

  describe("getNearbyCars", () => {
    describe("Nearby", () => {
      test("Same position on different lane ISSUE-Dsc2eTtk", () => {
        const car_1_1 = cars_2lanes_2_1[2];
        const result = carService.getNearbyCars(car_1_1, cars_2lanes_2_1);
        const snapshot = {
          car: car_1_1,
          cars: cars_2lanes_2_1,
          result
        };
        expect(snapshot).toMatchSnapshot();
      });
    });
    describe("Not nearby", () => {
      test("front in different lane ISSUE-uiNjBIP2", () => {
        const car_1_1 = cars_2lanes_2_1[1];
        const result = carService.getNearbyCars(car_1_1, cars_2lanes_2_1);
        const snapshot = {
          car: car_1_1,
          cars: cars_2lanes_2_1,
          result
        };
        expect(snapshot).toMatchSnapshot();
      });
    });
  });
});
