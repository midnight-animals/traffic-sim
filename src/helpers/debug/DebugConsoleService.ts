export class DebugConsoleService {
  public init() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "c": {
          console.clear();
          break;
        }
      }
    });
  }
}
