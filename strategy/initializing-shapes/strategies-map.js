import { LineMouseDownStrategy } from "./line-mousedown.strategy.js";
import { RectangleMouseDownStrategy } from "./rectangle-mousedown.strategy.js";

export const mouseDownStrategies = {
  line: LineMouseDownStrategy,
  rectangle: RectangleMouseDownStrategy,
};
