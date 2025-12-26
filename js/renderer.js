// --------------------
// Функции отрисовки
// --------------------
function drawBackground(ctx, canvas, GROUND_Y) {
  ctx.fillStyle = "#c2a26c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Рисуем землю
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

  // Убрана отладочная информация для улучшения игрового процесса
}

// --------------------
// Стартовый экран
// --------------------
function drawStartScreen(ctx, canvas) {
  drawBackground(ctx, canvas, canvas.height * 0.77);

  // Заголовок
  ctx.fillStyle = "#000";
  ctx.font = "bold 30px monospace";
  ctx.textAlign = "center";
  ctx.fillText("Бобёр-трезвенник", canvas.width/2, 100);

  // Инструкции
  ctx.font = "18px monospace";
  ctx.fillText("Помоги бобру избежать пива и водки!", canvas.width/2, 150);

  ctx.font = "16px monospace";
  ctx.fillText("Нажми или тапни, чтобы прыгать", canvas.width/2, 200);
  ctx.fillText("Двойной прыжок доступен!", canvas.width/2, 230);

  ctx.font = "20px monospace";
  ctx.fillText("Нажми или тапни, чтобы начать", canvas.width/2, 300);

  ctx.textAlign = "left"; // Возвращаем выравнивание по умолчанию
}

function drawScore(ctx, score, x = 10, y = 24) {
  ctx.fillStyle = "#000";
  ctx.font = "18px monospace";
  ctx.fillText("Score: " + score, x, y);
}

function drawHighScore(ctx, highScore, x = 10, y = 44) {
  if (highScore > 0) {
    ctx.fillStyle = "#000";
    ctx.font = "18px monospace";
    ctx.fillText("Best: " + highScore, x, y);
  }
}

function drawGameOver(ctx, canvas, score) {
  // Dark overlay
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // White text
  ctx.fillStyle = "#fff";
  ctx.font = "20px monospace";
  ctx.textAlign = "center";
  ctx.fillText("НАПИЛСЯ", canvas.width/2, canvas.height/2 - 30);
  ctx.fillText(`ты не бухал ${score} шагов`, canvas.width/2, canvas.height/2);
  ctx.fillText("тап чтобы начать заново", canvas.width/2, canvas.height/2 + 30);
  ctx.textAlign = "left"; // Reset to default
}

function drawDebugHitboxes(ctx, canvas, beaver, obstacles, GROUND_Y) {
  // Отладка: отображаем хитбоксы
  if (false) { // Измените на true для включения отладки
    ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    ctx.lineWidth = 2;

    // Хитбокс бобра
    const hitboxMargin = 0.15;
    ctx.strokeRect(
      beaver.x + beaver.w * hitboxMargin,
      beaver.y + beaver.h * hitboxMargin,
      beaver.w * (1 - 2 * hitboxMargin),
      beaver.h * (1 - 2 * hitboxMargin)
    );

    // Хитбоксы препятствий
    obstacles.forEach(o => {
      const realHeight = o.w * (o.aspectRatio || (o.type === "beer" ? 2.5 : 2.8));
      const realY = o.y - (realHeight - o.h) / 2;

      ctx.strokeStyle = o.type === "beer" ? "rgba(255, 215, 0, 0.5)" : "rgba(65, 105, 225, 0.5)";
      ctx.strokeRect(
        o.x + o.w * hitboxMargin,
        realY + realHeight * hitboxMargin,
        o.w * (1 - 2 * hitboxMargin),
        realHeight * (1 - 2 * hitboxMargin)
      );
    });
  }
}

export { 
  drawBackground, 
  drawStartScreen, 
  drawScore, 
  drawHighScore, 
  drawGameOver, 
  drawDebugHitboxes 
};
