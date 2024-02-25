import { Line } from "../shapes/line.js";
import { Rectangle } from "../shapes/rectangle.js";

export function Layer() {
  this.name = "default";
  this.visible = true;
  this.shapes = [
    new Rectangle(281, 181, 240, 128, "black"),
    new Line(219, 155, 462, 102, "black"),
  ];
}

Layer.prototype.hide = function () {
  this.visible = false;
};

Layer.prototype.show = function () {
  this.visible = true;
};
