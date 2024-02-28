const layersMenuItem = document.querySelector("#layers-menu-item");
const layersDropdown = document.querySelector("#layers-menu");

layersMenuItem.addEventListener("click", (e) => {
  const command = e.target.dataset["command"];
  if (command) {
    document.dispatchEvent(new CustomEvent(command));
  }
  layersDropdown.classList.toggle("display-block");
});
