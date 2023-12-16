import getCursorPosition from "./cursor-helper.js";
import { initShapesClickListenersWith, initShapes } from "./shape-listeners.js";
import { LineBuilder } from "./shapes/line.js";
import { RectangleBuilder } from "./shapes/rectangle.js";

(function () {
  let shapeStroke = "red";
  const leftPanelWidth = 200;
  const headerHeight = 30;

  const resetButton = document.querySelector(".reset-button");
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const focusClass = "shapes__element--focus";

  canvas.width = window.innerWidth - leftPanelWidth;
  canvas.height = window.innerHeight - headerHeight;

  const { peekShape, selectShape, shapeTypes } = initShapes();
  resetButton.addEventListener("click", reset);
  const listeners = initShapesClickListenersWith(shapeTypes, function (shape) {
    const prevShape = peekShape();

    if (prevShape) {
      prevShape.classList.remove(focusClass);
    }
    shape.classList.add(focusClass);
    selectShape(shape);
  });
  let drag = false;
  let currentlyDrawnShape = null;

  const lineBuilder = new LineBuilder();
  const rectangleBuilder = new RectangleBuilder();

  const layers = [
    {
      name: "default",
      shapes: [],
    },
  ];

  let animationFrameId = null;

  // handlers for start and stop draw
  canvas.addEventListener("mousedown", (event) => {
    const isLine = peekShape() && peekShape().dataset.shapeType === "line";
    const { x, y } = getCursorPosition(canvas, event);

    if (isLine) {
      currentlyDrawnShape = lineBuilder.setStart(x, y).setEnd(x, y).build();
      layers[0].shapes.push(currentlyDrawnShape);

      drag = true;
      animationFrameId = window.requestAnimationFrame(loop);
    }

    if (peekShape() && peekShape().dataset.shapeType === "rectangle") {
      currentlyDrawnShape = rectangleBuilder
        .setX(x)
        .setY(y)
        .setWidth(0)
        .setHeight(0)
        .build();
      layers[0].shapes.push(currentlyDrawnShape);

      drag = true;
      animationFrameId = window.requestAnimationFrame(loop);
    }
  });

  canvas.addEventListener("mousemove", (event) => {
    if (drag) {
      const { x, y } = getCursorPosition(canvas, event);

      if (peekShape() && peekShape().dataset.shapeType === "line") {
        currentlyDrawnShape.setEnd(x, y);
      }

      if (peekShape() && peekShape().dataset.shapeType === "rectangle") {
        const x1 = currentlyDrawnShape.x;
        const y1 = currentlyDrawnShape.y;
        currentlyDrawnShape.setWidth(x - x1).setHeight(y - y1);
      }
    }
  });

  canvas.addEventListener("mouseup", (event) => {
    drag = false;
    const isLine = peekShape() && peekShape().dataset.shapeType === "line";
    const { x, y } = getCursorPosition(canvas, event);

    if (isLine) {
      currentlyDrawnShape.setEnd(x, y);
      const lastShapeIdx = layers[0].shapes.length - 1;

      layers[0].shapes[lastShapeIdx] = currentlyDrawnShape;
    }

    if (peekShape() && peekShape().dataset.shapeType === "rectangle") {
      const x1 = currentlyDrawnShape.x;
      const y1 = currentlyDrawnShape.y;
      currentlyDrawnShape
        .setWidth(Math.abs(x - x1))
        .setHeight(Math.abs(y - y1));
    }

    const lastShapeIdx = layers[0].shapes.length - 1;

    layers[0].shapes[lastShapeIdx] = currentlyDrawnShape;
    currentlyDrawnShape = null;
  });

  canvas.addEventListener("mouseout", (event) => {
    drag = false;
  });

  function loop(timestamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    animationFrameId = window.requestAnimationFrame(loop);

    layers[0].shapes.forEach((shape) => {
      shape.draw(context);
    });
  }
  animationFrameId = window.requestAnimationFrame(loop);

  function reset() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.cancelAnimationFrame(animationFrameId);
    layers[0].shapes = [];
  }
})();
