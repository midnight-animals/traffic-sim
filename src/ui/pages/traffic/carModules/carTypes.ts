export interface ICar extends Partial<DOMRect> {
  speed?: number;
  /**
   * Which lane to change to, else `null`
   */
  wantToChangeLane?: number;
}
