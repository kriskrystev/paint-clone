import { BaseStrategy } from "./base.strategy.js";

export function MouseDownRectangleDrawStrategy() {
  BaseStrategy.call(this);

  this.initShape = function () {
    // RectangleBuilder
    this.shape = this.builder
      .setX(this.x)
      .setY(this.y)
      .setWidth(0)
      .setHeight(0)
      .build();
    return this.shape;
  };
}

MouseDownRectangleDrawStrategy.prototype = Object.create(
  BaseStrategy.prototype,
  {
    constructor: {
      value: MouseDownRectangleDrawStrategy,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  }
);
