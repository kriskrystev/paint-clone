export function BaseStrategy() {
  this.shape = null;
  this.x = 0;
  this.y = 0;
}

BaseStrategy.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
};

BaseStrategy.prototype.setShape = function (shape) {
  this.shape = shape;
};
