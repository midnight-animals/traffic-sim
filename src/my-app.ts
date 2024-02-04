import { inject } from "aurelia";
import { DebugConsoleService } from "./helpers/debug/DebugConsoleService";

@inject(DebugConsoleService)
export class MyApp {
  public message = "Hello World!";

  constructor(private debugConsoleService: DebugConsoleService) {}

  attached() {
    this.debugConsoleService.init();
  }
}
