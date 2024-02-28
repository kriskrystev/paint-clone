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

  layerNameDiv.classList.add("inspector__layers-layer-name", "ellipsis");
  layerNameDiv.style.marginRight = "0.5rem";
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

  function createAndDispatchNameChange(event) {
    if (!event.target.value) return;

    const layerNameChangedEvent = new CustomEvent("layer-name-changed", {
      bubbles: true,
      detail: {
        value: () => {
          return {
            oldValue: layer.name,
            newValue: event.target.value,
            layer,
            layerNumber,
          };
        },
      },
    });
    layerDiv.dispatchEvent(layerNameChangedEvent);
  }

  layerNameDiv.addEventListener("dblclick", () => {
    const nameInput = document.createElement("input");
    nameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        createAndDispatchNameChange(e);
      }
    });

    nameInput.addEventListener("blur", (e) => {
      createAndDispatchNameChange(e);
    });

    nameInput.type = "text";
    nameInput.style.width = "100%";
    nameInput.value = layer.name;

    layerNameDiv.innerHTML = "";
    layerNameDiv.appendChild(nameInput);
    nameInput.focus();
  });

  layerDiv.appendChild(layerNameDiv);
  layerIconObjectWrapper.appendChild(layerIconObjectOn);
  layerDiv.appendChild(layerIconObjectWrapper);

  return layerDiv;
}
