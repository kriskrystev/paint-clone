export function RectangleMouseDownStrategy() {
  this.shape = null;
  this.builder = null;
  this.x = 0;
  this.y = 0;

  this.initShape = function () {
    this.shape = this.builder
      .setX(this.x)
      .setY(this.y)
      .setWidth(0)
      .setHeight(0)
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
