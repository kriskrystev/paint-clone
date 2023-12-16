export function Rectangle(x, y, width, height, fillStyle) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fillStyle = fillStyle;

  this.setWidth = function (width) {
    this.width = width;
    return this;
  };

  this.setHeight = function (height) {
    this.height = height;
    return this;
  };

  this.draw = function (context) {
    context.fillStyle = this.fillStyle;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export function RectangleBuilder() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.strokeStyle = "black";

  this.setX = function (x) {
    this.x = x;
    return this;
  };

  this.setY = function (y) {
    this.y = y;
    return this;
  };

  this.setWidth = function (width) {
    this.width = width;
    return this;
  };

  this.setHeight = function (height) {
    this.height = height;
    return this;
  };

  this.setStrokeStyle = function (strokeStyle) {
    this.strokeStyle = strokeStyle;
    return this;
  };

  this.build = function () {
    return new Rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      this.strokeStyle
    );
  };
}
