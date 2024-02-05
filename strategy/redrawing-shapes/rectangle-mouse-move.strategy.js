export function MouseMoveRectangleDrawStrategy() {
  this.shape = null;
  this.x = 0;
  this.y = 0;

  this.draw = function () {
    this.shape.setWidth(this.x - this.shape.x).setHeight(this.y - this.shape.y);
  };

  this.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  };

  this.setShape = function (shape) {
    this.shape = shape;
  };
}
