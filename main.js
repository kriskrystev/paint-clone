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
  const layers = [
    {
      name: "default",
      shapes: [],
    },
  ];

  let animationFrameId = null;

  // handlers for start and stop draw
  canvas.addEventListener("mousedown", (event) => {
    animationFrameId = window.requestAnimationFrame(loop);

    if (peekShape() && peekShape().dataset.shapeType === "line") {
      const { x, y } = getCursorPosition(canvas, event);
      currentlyDrawnShape = lineBuilder.setStart(x, y).setEnd(x, y).build();

      drag = true;
    }
  });

  canvas.addEventListener("mousemove", (event) => {
    if (drag) {
      const { x, y } = getCursorPosition(canvas, event);
      currentlyDrawnShape.setEnd(x, y);
    }
  });

  canvas.addEventListener("mouseup", (event) => {
    if (peekShape() && peekShape().dataset.shapeType === "line") {
      const { x, y } = getCursorPosition(canvas, event);
      currentlyDrawnShape.setEnd(x, y);
      layers[0].shapes.push(currentlyDrawnShape);
      currentlyDrawnShape = null;
    }
    drag = false;
    if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
  });

  canvas.addEventListener("mouseout", (event) => {
    if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    drag = false;
  });

  function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    animationFrameId = window.requestAnimationFrame(loop);

    if (drag) {
      if (currentlyDrawnShape) {
        currentlyDrawnShape.draw(context);
        layers[0].shapes.forEach((shape) => shape.draw(context));
      }
    }
  }

  function reset() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.cancelAnimationFrame(animationFrameId);
    layers[0].shapes = [];
  }
})();
