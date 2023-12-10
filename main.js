import getCursorPosition from "./cursor-helper.js";
import { initShapesClickListenersWith, initShapes } from "./shape-listeners.js";
import { RectangleBuilder } from "./shapes/rectangle.js";

(function () {
  let shapeStroke = "red";
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const focusClass = "shapes__element--focus";

  canvas.width = window.innerWidth - 200;
  canvas.height = window.innerHeight - 30;
  const { peekShape, selectShape, shapeTypes } = initShapes();
  const listeners = initShapesClickListenersWith(shapeTypes, function (shape) {
    const prevShape = peekShape();

    if (prevShape) {
      prevShape.classList.remove(focusClass);
    }
    shape.classList.add(focusClass);
    selectShape(shape);
  });

  // handlers for start and stop draw
  canvas.addEventListener("mousedown", (event) => {
    if (peekShape() && peekShape().dataset.shapeType === "line") {
      const { x, y } = getCursorPosition(canvas, event);
      context.beginPath();
      context.moveTo(x, y);
    }
  });

  canvas.addEventListener("mouseup", (event) => {
    if (peekShape() && peekShape().dataset.shapeType === "line") {
      const { x, y } = getCursorPosition(canvas, event);
      context.lineTo(x, y);
      context.strokeStyle = shapeStroke;
      context.stroke();
    }
  });

  const rectangleBuilder = new RectangleBuilder();
  const rectangle = rectangleBuilder
    .setX(100)
    .setY(100)
    .setWidth(200)
    .setHeight(200)
    .build();
  rectangle.draw(context);
})();
