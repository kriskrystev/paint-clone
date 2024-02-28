import { buildersMap } from "./builders/builders-map.js";
import getCursorPosition from "./helpers/cursor-helper.js";
import { LinkedList } from "./helpers/data-structures/linked-list.js";
import { LayerHtmlElement } from "./layers/html/layer-html-element.js";
import { Layer } from "./layers/layer.js";
import { initShapesClickListenersWith, initShapes } from "./shape-listeners.js";
import { mouseDownStrategies } from "./strategy/initializing-shapes/strategies-map.js";
import { strategies } from "./strategy/redrawing-shapes/strategies-map.js";

(function () {
  // ======================== CONFIG END ========================
  let shapeStroke = "red";
  let shapeMouseMoveStrategy = null;
  let shapeBuilder = null;

  const leftPanelWidth = 200;
  const headerHeight = 30;

  const resetButton = document.querySelector(".reset-button");
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const focusClass = "shapes__element--focus";
  const layersContainer = document.getElementById("inspector__layers");

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

    shapeMouseMoveStrategy = new strategies[shape.dataset.shapeType]();
    shapeBuilder = new buildersMap[shape.dataset.shapeType]();
  });
  let drag = false;
  let currentlyDrawnShape = null;

  let currentLayerIndex = 0;
  let currentlySelectedLayer = null;
  const layers = new LinkedList();
  layers.push(new Layer());

  displayLayerContainers();

  let animationFrameId = null;

  // ======================== CONFIG END ========================

  // ======================== DRAW HANDLERS START ========================
  canvas.addEventListener("mousedown", (event) => {
    const shape = peekShape();

    if (shape) {
      const { x, y } = getCursorPosition(canvas, event);
      const mouseDownDrawStrategy = new mouseDownStrategies[
        shape.dataset.shapeType
      ]();

      mouseDownDrawStrategy.setPosition(x, y);
      mouseDownDrawStrategy.setShape(currentlyDrawnShape);
      mouseDownDrawStrategy.setBuilder(shapeBuilder);
      currentlyDrawnShape = mouseDownDrawStrategy.initShape();

      if (currentlySelectedLayer) {
        layers.get(currentLayerIndex).val.shapes.push(currentlyDrawnShape);
        drag = true;
      }
    }

    animationFrameId = window.requestAnimationFrame(loop);
  });

  canvas.addEventListener("mousemove", (event) => {
    if (drag) {
      const { x, y } = getCursorPosition(canvas, event);

      shapeMouseMoveStrategy.setShape(currentlyDrawnShape);
      shapeMouseMoveStrategy.setPosition(x, y);
      shapeMouseMoveStrategy.draw();
    }
  });

  canvas.addEventListener("mouseup", (event) => {
    drag = false;
    const isLine = peekShape() && peekShape().dataset.shapeType === "line";
    const { x, y } = getCursorPosition(canvas, event);

    if (isLine) {
      currentlyDrawnShape.setEnd(x, y);
    }

    if (currentlyDrawnShape && currentlySelectedLayer) {
      const lastShapeIdx = layers.get(currentLayerIndex).val.shapes.length - 1;
      layers.get(currentLayerIndex).val.shapes[lastShapeIdx] =
        currentlyDrawnShape;
      currentlyDrawnShape = null;
    }
  });

  // ======================== DRAW HANDLERS END ========================

  // ======================== ANIMATION START ========================
  function loop(timestamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    animationFrameId = window.requestAnimationFrame(loop);

    let current = layers.head;

    while (current) {
      if (current.val.visible) {
        current.val.shapes.forEach((shape) => {
          shape.draw(context);
        });
      }
      current = current.next;
    }
  }
  animationFrameId = window.requestAnimationFrame(loop);

  function reset() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.cancelAnimationFrame(animationFrameId);
    layers.get(currentLayerIndex).val.shapes = [];
  }

  // ======================== ANIMATION END ========================

  function displayLayerContainers() {
    let current = layers.head;
    let containers = [];
    let prevHtmlElement = null;
    let layerNumber = 0;

    if (!current) return null;

    while (current) {
      const newLayerHtmlElement = new LayerHtmlElement(
        current.val,
        layerNumber
      );
      // ------------- Custom events -------------

      newLayerHtmlElement.addEventListener("layer-clicked", (e) => {
        const clickedLayer = e.detail.value().layer;

        if (currentlySelectedLayer === clickedLayer) {
          return;
        }

        if (prevHtmlElement) {
          prevHtmlElement.classList.remove("inspector__layers-layer--selected");
        }

        newLayerHtmlElement.classList.add("inspector__layers-layer--selected");
        prevHtmlElement = newLayerHtmlElement;

        currentlySelectedLayer = e.detail.value().layer;
        currentLayerIndex = e.detail.value().layerNumber;
      });

      newLayerHtmlElement.addEventListener("layer-name-changed", (e) => {
        const { layerNumber, newValue } = e.detail.value();
        layers.get(layerNumber).val.name = newValue;
        const inputElement = newLayerHtmlElement.querySelector("input");

        try {
          inputElement.replaceWith(document.createTextNode(newValue));
        } catch (e) {}
      });

      // ------------- Custom events -------------
      containers.push(newLayerHtmlElement);
      current = current.next;
      layerNumber++;
    }

    layersContainer.append(...containers);
  }
})();
