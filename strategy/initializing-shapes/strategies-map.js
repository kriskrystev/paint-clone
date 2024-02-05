import { MouseDownLineDrawStrategy } from "./line-mousedown.strategy.js";
import { MouseDownRectangleDrawStrategy } from "./rectangle-mousedown.strategy.js";

export const mouseDownStrategies = {
  line: MouseDownLineDrawStrategy,
  rectangle: MouseDownRectangleDrawStrategy,
};
