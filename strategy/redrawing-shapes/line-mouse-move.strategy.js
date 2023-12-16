// there's a bit of repeating going on here
// if more and more strategies start doing this - refactor and abstract the logic
export function LineMouseMoveStrategy() {
  this.shape = null;
  this.x = 0;
  this.y = 0;

  this.draw = function () {
    this.shape.setEnd(this.x, this.y);
  };

  this.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  };

  this.setShape = function (shape) {
    this.shape = shape;
  };
}
