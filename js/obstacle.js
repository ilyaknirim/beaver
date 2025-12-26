// --------------------
// Бутылки
// --------------------
const obstacles = [];
let frameCount = 0;

// Предзагруженные изображения препятствий
const obstacleImages = {
  beer: new Image(),
  vodka: new Image()
};

// Функция для предзагрузки изображений препятствий
function preloadObstacleImages() {
  // Загружаем изображение для пива
  obstacleImages.beer.onload = function() {
    console.log("Beer image loaded successfully");
  };
  obstacleImages.beer.onerror = function() {
    console.error("Failed to load beer image");
  };
  obstacleImages.beer.src = "beer.svg";

  // Загружаем изображение для водки
  obstacleImages.vodka.onload = function() {
    console.log("Vodka image loaded successfully");
  };
  obstacleImages.vodka.onerror = function() {
    console.error("Failed to load vodka image");
  };
  obstacleImages.vodka.src = "vodka.svg";

  console.log("Preloading obstacle images...");
}

function spawnObstacle(canvas, GROUND_Y) {
  const flying = Math.random() < 0.3;
  const type = Math.random() < 0.5 ? 'beer' : 'vodka';

  const scale = Math.min(canvas.width / 800, canvas.height / 400);
  // Настраиваем размеры в соответствии с реальными изображениями
  const baseWidth = flying ? 50 : 35;
  const aspectRatio = type === "beer" ? 2.5 : 2.8; // Соотношение высоты к ширине
  const baseHeight = baseWidth * aspectRatio;
  const baseY = flying ? 90 : GROUND_Y - baseHeight;

  obstacles.push({
    x: canvas.width,
    y: baseY * scale,
    w: baseWidth * scale,
    h: baseHeight * scale,
    img: obstacleImages[type], // Используем предзагруженное изображение
    type, // Сохраняем тип для отладки
    flying,
    angle: 0,
    aspectRatio // Сохраняем соотношение сторон для правильного масштабирования
  });

  console.log(`Spawned ${type} obstacle, flying: ${flying}`);
}

function updateObstacles(ctx, canvas, speed, gameOver, collisionAnimationActive, beaver, GROUND_Y, playDrunk) {
  // Обновляем и рисуем препятствия
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const o = obstacles[i];

    if(!gameOver && !collisionAnimationActive) {
      o.x -= speed;
      if(o.flying) {
        o.angle += 0.05;
        o.y += Math.sin(o.angle) * 2;
      }
    }

    ctx.save();
    ctx.translate(o.x + o.w/2, o.y + o.h/2);
    if(o.flying){
      ctx.rotate(o.angle);
    }
    // Проверяем, загружено ли изображение
    if (o.img && o.img.complete) {
      // Используем сохраненное соотношение сторон
      const aspectRatio = o.aspectRatio || (o.type === "beer" ? 2.5 : 2.8);
      const width = o.w;
      const height = o.w * aspectRatio;

      // Рисуем изображение с правильным масштабированием
      ctx.drawImage(o.img, -width/2, -height/2, width, height);
    } else {
      // Временная замена - прямоугольник, если изображение не загружено
      ctx.fillStyle = o.type === "beer" ? "#D4AF37" : "#4169E1";
      ctx.fillRect(-o.w/2, -o.h/2, o.w, o.h);

      // Добавляем текст для идентификации типа
      ctx.fillStyle = "#fff";
      ctx.font = `${Math.min(16, o.w/2)}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(o.type === "beer" ? "🍺" : "🍾", 0, 0);
      ctx.textAlign = "left";
    }
    ctx.restore();

    // Уточненная проверка столкновения с учетом реальных размеров изображений
    const realHeight = o.w * (o.aspectRatio || (o.type === "beer" ? 2.5 : 2.8));
    const realY = o.y - (realHeight - o.h) / 2; // Корректируем позицию Y

    // Уменьшаем хитбокс для более точного определения столкновения
    const hitboxMargin = 0.15; // 15% отступ от краев
    const beaverLeft = beaver.x + beaver.w * hitboxMargin;
    const beaverRight = beaver.x + beaver.w * (1 - hitboxMargin);
    const beaverTop = beaver.y + beaver.h * hitboxMargin;
    const beaverBottom = beaver.y + beaver.h * (1 - hitboxMargin);

    const obstacleLeft = o.x + o.w * hitboxMargin;
    const obstacleRight = o.x + o.w * (1 - hitboxMargin);
    const obstacleTop = realY + realHeight * hitboxMargin;
    const obstacleBottom = realY + realHeight * (1 - hitboxMargin);

    if(beaverLeft < obstacleRight &&
       beaverRight > obstacleLeft &&
       beaverTop < obstacleBottom &&
       beaverBottom > obstacleTop &&
       !gameOver && !collisionAnimationActive) {

      collisionAnimationActive = true;
      currentCollisionFrame = 0;
      gameOver = true;
      playDrunk();
    }

    // Удаляем препятствия
    if(o.x + o.w < 0) {
      obstacles.splice(i, 1);
    }
  }
}

function clearObstacles() {
  obstacles.length = 0;
}

function getObstacles() {
  return obstacles;
}

function getFrameCount() {
  return frameCount;
}

function incrementFrameCount() {
  frameCount++;
}

function resetFrameCount() {
  frameCount = 0;
}

export { 
  preloadObstacleImages, 
  spawnObstacle, 
  updateObstacles, 
  clearObstacles, 
  getObstacles, 
  getFrameCount, 
  incrementFrameCount, 
  resetFrameCount 
};
