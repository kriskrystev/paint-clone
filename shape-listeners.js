function createShapeSelector() {
  let selectedShape = null;

  function selectShape(shape) {
    selectedShape = shape;
  }

  function peekShape() {
    return selectedShape;
  }

  return {
    selectShape,
    peekShape,
  };
}

export function initShapesClickListenersWith(shapes, clickHandler) {
  const onClick = function (shape) {
    return () => {
      clickHandler(shape);
    };
  };

  function clearAll() {
    shapes.forEach((shape) => {
      shape.removeEventListener("click", onClick, false);
    });
  }

  shapes.forEach((shape) => {
    shape.addEventListener("click", onClick(shape), false);
  });

  return {
    clearAll,
  };
}

export function initShapes() {
  const shapeTypes = document.querySelectorAll(".shapes__element");
  let { peekShape, selectShape } = createShapeSelector();

  return {
    shapeTypes,
    peekShape,
    selectShape,
  };
}
