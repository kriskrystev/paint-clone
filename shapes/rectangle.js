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
