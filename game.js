// Импорты из модулей
import { beaver, setCollisionAnimationActive, setCurrentCollisionFrame, updateAnimation, collisionAnimationActive } from "./js/beaver.js";
import { 
  preloadObstacleImages, 
  spawnObstacle, 
  updateObstacles, 
  clearObstacles, 
  getFrameCount, 
  incrementFrameCount, 
  resetFrameCount 
} from "./js/obstacle.js";
import { 
  drawBackground, 
  drawStartScreen, 
  drawScore, 
  drawHighScore, 
  drawGameOver, 
  drawDebugHitboxes 
} from "./js/renderer.js";
import { saveScore, getHighScore } from "./js/score.js";
import { playJump, playDrunk } from "./js/audio.js";
import { initTelegram, getTelegram } from "./js/telegram.js";
import { resizeCanvas } from "./js/utils.js";

// Инициализация canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

console.log("Game script loaded, canvas:", canvas);

// Инициализация переменных
let GROUND_Y; // Будет установлена в resizeCanvas
const GRAVITY = 0.4;
const JUMP = -10;
let speed = 5;
let score = 0;
let gameOver = false;
let startScreen = true;

// Инициализация Telegram Web App
initTelegram();

// Адаптация под размер экрана
function resizeGameCanvas() {
  GROUND_Y = resizeCanvas(canvas);

  // Обновляем размер бобра, если он уже создан
  if (beaver) {
    beaver.updateSize(canvas, GROUND_Y);
  }
}

// --------------------
// Основной игровой цикл
// --------------------
function reset() {
  console.log("Game reset");

  // Сохраняем счет, если игра завершилась
  if (gameOver && score > 0) {
    saveScore(score, getTelegram());
  }

  clearObstacles();
  score = 0;
  gameOver = false;
  setCollisionAnimationActive(false);
  setCurrentCollisionFrame(0);
  resetFrameCount();
  speed = 5;
  beaver.updateSize(canvas, GROUND_Y);
  beaver.vy = 0;
  beaver.jumps = 0;
}

function update() {
  // Если игра на стартовом экране
  if (startScreen) {
    drawStartScreen(ctx, canvas);
    requestAnimationFrame(update);
    return;
  }

  drawBackground(ctx, canvas, GROUND_Y);

  // Рисуем бобра
  beaver.update(gameOver, collisionAnimationActive, GROUND_Y, GRAVITY);
  updateAnimation();
  beaver.draw();

  // Генерируем препятствия
  if(!gameOver) {
    incrementFrameCount();
    if(getFrameCount() % 80 === 0) {
      spawnObstacle(canvas, GROUND_Y);
    }

    // Увеличиваем скорость каждые 200 очков
    if(getFrameCount() % 200 === 0) {
      speed += 0.5;
    }

    // Увеличиваем счёт
    if(getFrameCount() % 10 === 0) {
      score++;
      console.log("Score updated:", score);
    }
  }

  // Обновляем и рисуем препятствия
  gameOver = updateObstacles(ctx, canvas, speed, gameOver, false, beaver, GROUND_Y, playDrunk);

  // Отображение счета
  drawScore(ctx, score);

  // Отображение лучшего счета
  const highScore = getHighScore(getTelegram());
  drawHighScore(ctx, highScore);

  // Сообщение о завершении игры
  if(gameOver){
    drawGameOver(ctx, canvas, score);
  }

  requestAnimationFrame(update);
}

// Обработчики управления
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (startScreen) {
    startScreen = false;
    reset();
  } else if (gameOver) {
    reset();
  } else {
    beaver.jump();
  }
});

canvas.addEventListener("mousedown", (e) => {
  e.preventDefault();
  if (startScreen) {
    startScreen = false;
    reset();
  } else if (gameOver) {
    reset();
  } else {
    beaver.jump(gameOver, collisionAnimationActive, GROUND_Y, JUMP);
  }
});

// Инициализация игры
function initGame() {
  console.log("Initializing game...");

  // Сначала инициализируем canvas
  resizeGameCanvas();

  // Устанавливаем обработчик изменения размера окна
  window.addEventListener('resize', resizeGameCanvas);

  // Инициализируем бобра
  beaver.updateSize(canvas, GROUND_Y);

  // Сбрасываем состояние игры
  reset();

  // Запускаем игровой цикл
  console.log("Starting game loop...");
  update();
}

// Запускаем игру когда DOM загружен
document.addEventListener('DOMContentLoaded', function() {
  // Предзагружаем изображения перед запуском игры
  preloadObstacleImages();
  // Запускаем игру
  initGame();
});
