export function LayerHtmlElement(layer, layerNumber) {
  const layerDiv = document.createElement("div");

  // --------------- EVENTS ---------------

  const layerClicked = new CustomEvent("layer-clicked", {
    bubbles: true,
    detail: {
      value: () => {
        return { layer, layerNumber };
      },
    },
  });

  layerDiv.addEventListener("click", (e) => {
    e.target.dispatchEvent(layerClicked);
  });

  // --------------- EVENTS ---------------

  layerDiv.classList.add(
    "inspector__layers-layer",
    "surface-mixed-foreground-600"
  );
  const layerIconObjectWrapper = document.createElement("div");

  // --------------- ON / OFF ICONS ---------------
  const layerIconObjectOn = document.createElement("object");
  const layerIconObjectOff = document.createElement("object");
  layerIconObjectOn.type = "image/svg+xml";
  layerIconObjectOn.data = "/assets/eye-on.svg";
  layerIconObjectOn.width = "100%";

  layerIconObjectOff.type = "image/svg+xml";
  layerIconObjectOff.data = "/assets/eye-off.svg";
  layerIconObjectOff.width = "100%";
  // --------------- ON / OFF ICONS ---------------

  const layerNameDiv = document.createElement("div");

  layerNameDiv.classList.add(["inspector__layers-layer-name"]);
  layerNameDiv.innerHTML = layer.name;

  layerIconObjectWrapper.classList.add("clickable");
  layerIconObjectWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    const oldObject = layerIconObjectWrapper.querySelector("object");

    if (layer.visible) {
      layer.hide();
      layerIconObjectWrapper.replaceChild(layerIconObjectOff, oldObject);
    } else {
      layer.show();
      layerIconObjectWrapper.replaceChild(layerIconObjectOn, oldObject);
    }
  });

  layerDiv.appendChild(layerNameDiv);
  layerIconObjectWrapper.appendChild(layerIconObjectOn);
  layerDiv.appendChild(layerIconObjectWrapper);

  return layerDiv;
}
