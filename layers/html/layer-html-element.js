export function LayerHtmlElement(layer) {
  const layerDiv = document.createElement("div");

  layerDiv.addEventListener("click", () => {
    if (layer.visible) {
      layer.hide();
    } else {
      layer.show();
    }
  });

  layerDiv.classList.add(
    "inspector__layers-layer",
    "surface-mixed-foreground-600"
  );
  const layerNameDiv = document.createElement("div");
  layerNameDiv.classList.add(["inspector__layers-layer-name"]);
  layerNameDiv.innerHTML = layer.name;

  layerDiv.appendChild(layerNameDiv);

  return layerDiv;
}
