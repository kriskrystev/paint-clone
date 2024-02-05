export function BaseStrategy() {
  this.shape = null;
  this.builder = null;
  this.x = 0;
  this.y = 0;
}

BaseStrategy.prototype.setShape = function (shape) {
  this.shape = shape;
};

BaseStrategy.prototype.setBuilder = function (builder) {
  this.builder = builder;
};

BaseStrategy.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
};
