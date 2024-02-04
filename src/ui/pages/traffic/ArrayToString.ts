import { valueConverter } from "aurelia";

@valueConverter("arrayToString")
export class ArrayToString {
  toView(array: number[]): string {
    return array?.join(" | ");
  }
}
