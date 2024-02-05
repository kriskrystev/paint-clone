import { MouseMoveLineDrawStrategy } from "./line-mouse-move.strategy.js";
import { MouseMoveRectangleDrawStrategy } from "./rectangle-mouse-move.strategy.js";

export const strategies = {
  rectangle: MouseMoveRectangleDrawStrategy,
  line: MouseMoveLineDrawStrategy,
};
