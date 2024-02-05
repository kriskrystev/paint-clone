// there's a bit of repeating going on here

import { BaseStrategy } from "./base.strategy.js";

// if more and more strategies start doing this - refactor and abstract the logic
export function MouseMoveLineDrawStrategy() {
  BaseStrategy.call(this);

  this.draw = function () {
    this.shape.setEnd(this.x, this.y);
  };
}

MouseMoveLineDrawStrategy.prototype = Object.create(BaseStrategy.prototype, {
  constructor: {
    value: MouseMoveLineDrawStrategy,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
