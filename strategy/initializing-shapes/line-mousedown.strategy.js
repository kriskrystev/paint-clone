import { BaseStrategy } from "./base.strategy.js";

export function MouseDownLineDrawStrategy() {
  BaseStrategy.call(this);

  this.initShape = function () {
    // LineBuilder
    this.shape = this.builder
      .setStart(this.x, this.y)
      .setEnd(this.x, this.y)
      .build();
    return this.shape;
  };
}

MouseDownLineDrawStrategy.prototype = Object.create(BaseStrategy.prototype, {
  constructor: {
    value: MouseDownLineDrawStrategy,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
