import { LineMouseMoveStrategy } from "./line-mouse-move.strategy.js";
import { RectangleMouseMoveStrategy } from "./rectangle-mouse-move.strategy.js";

export const strategies = {
  rectangle: RectangleMouseMoveStrategy,
  line: LineMouseMoveStrategy,
};
