import { BaseStrategy } from "./base.strategy.js";

export function MouseMoveRectangleDrawStrategy() {
  BaseStrategy.call(this);

  this.draw = function () {
    this.shape.setWidth(this.x - this.shape.x).setHeight(this.y - this.shape.y);
  };
}

MouseMoveRectangleDrawStrategy.prototype = Object.create(
  BaseStrategy.prototype,
  {
    constructor: {
      value: MouseMoveRectangleDrawStrategy,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  }
);
