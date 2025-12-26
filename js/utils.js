// Вспомогательные функции

// Адаптация под размер экрана
function resizeCanvas(canvas) {
  console.log("Resizing canvas...");

  // Определяем максимальные размеры canvas
  const maxWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 20;
  const maxHeight = window.innerHeight > 400 ? 400 : window.innerHeight - 20;

  // Устанавливаем размеры canvas
  canvas.width = maxWidth;
  canvas.height = maxHeight;

  // Обновляем константы в зависимости от размера экрана
  const GROUND_Y = canvas.height * 0.77; // 77% от высоты экрана
  console.log("Canvas size:", canvas.width, "x", canvas.height, "GROUND_Y:", GROUND_Y);

  return GROUND_Y;
}

export { resizeCanvas };
