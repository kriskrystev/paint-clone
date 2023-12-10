export default function getCursorPosition(canvas, event) {
  const boundingClientRect = canvas.getBoundingClientRect();
  const x = event.clientX - boundingClientRect.left;
  const y = event.clientY - boundingClientRect.top;

  return {
    x,
    y,
  };
}
