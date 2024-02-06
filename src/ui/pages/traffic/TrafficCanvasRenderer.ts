export class TrafficCanvasRenderer {
  public init(canvas: HTMLCanvasElement) {
    this.generateTrafficCanvas(canvas);
  }

  generateTrafficCanvas(canvas: HTMLCanvasElement) {
    // Get a reference to the canvas and its context
    const ctx = canvas.getContext("2d");

    // Array of car objects
    const cars = [
      { x: 50, y: 50, speed: 1 },
      { x: 100, y: 100, speed: 2 },
      { x: 150, y: 150, speed: 3 }
      // Add more cars as needed
    ];

    // Function to draw a car at a given coordinate
    const drawCar = (car) => {
      ctx.beginPath();
      ctx.rect(car.x, car.y, 20, 10); // Draw a simple rectangle as a placeholder for the car
      ctx.fill();
    };

    // Function to update the position of a car
    const updateCar = (car) => {
      car.x += car.speed;
      if (car.x > canvas.width) {
        car.x = -20; // Reset the car's position to the start when it reaches the end of the canvas
      }
    };

    // Function to update the animation
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      for (const car of cars) {
        updateCar(car);
        drawCar(car);
      }

      requestAnimationFrame(update); // Call the update function again on the next frame
    };

    update(); // Start the animation
  }
}
