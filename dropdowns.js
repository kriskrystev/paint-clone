const layersMenuItem = document.querySelector("#layers-menu-item");
const layersDropdown = document.querySelector("#layers-menu");

layersMenuItem.addEventListener("click", (e) => {
  const command = e.target.dataset["command"];
  if (command) {
    console.log(command);
  }
  layersDropdown.classList.toggle("display-block");
});
