function Line(x1, y1, x2, y2, strokeStyle = "black") {
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
  this.strokeStyle = strokeStyle;

  this.draw = function (context) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = this.strokeStyle;
    context.stroke();
  };
}

export function LineBuilder() {
  this.x1 = 0;
  this.x2 = 0;
  this.y1 = 0;
  this.y2 = 0;
  this.strokeStyle = "black";

  this.setStart = function (x, y) {
    this.x1 = x;
    this.y1 = y;
    return this;
  };

  this.setEnd = function (x, y) {
    this.x2 = x;
    this.y2 = y;
    return this;
  };

  this.build = function () {
    return new Line(this.x1, this.y1, this.x2, this.y2, this.strokeStyle);
  };
}
