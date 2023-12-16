export function LineMouseDownStrategy() {
  this.shape = null;
  this.builder = null;
  this.x = 0;
  this.y = 0;

  this.initShape = function () {
    this.shape = this.builder
      .setStart(this.x, this.y)
      .setEnd(this.x, this.y)
      .build();
    return this.shape;
  };

  this.setShape = function (shape) {
    this.shape = shape;
  };

  this.setBuilder = function (builder) {
    this.builder = builder;
  };

  this.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  };
}
