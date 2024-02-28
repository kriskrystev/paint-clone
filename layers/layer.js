export function Layer(name) {
  this.name = name || "default";
  this.visible = true;
  this.shapes = [];
}

Layer.prototype.hide = function () {
  this.visible = false;
};

Layer.prototype.show = function () {
  this.visible = true;
};
