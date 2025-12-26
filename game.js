const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

console.log("Game script loaded, canvas:", canvas);

// Инициализация Telegram Web App
let tg;
try {
  tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  console.log("Telegram Web App initialized");
  
  // Используем цветовую схему Telegram
  if (tg.themeParams) {
    document.body.style.backgroundColor = tg.themeParams.bg_color || "#cce7ff";
  }
} catch (e) {
  console.log("Not running in Telegram Web App or error initializing:", e);
}

// Инициализация canvas и переменных
let GROUND_Y; // Будет установлена в resizeCanvas
const GRAVITY = 0.4;
const JUMP = -10;
let speed = 5;
let score = 0;
let gameOver = false;
let startScreen = true;

// Адаптация под размер экрана
function resizeCanvas() {
  console.log("Resizing canvas...");
  
  // Определяем максимальные размеры canvas
  const maxWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 20;
  const maxHeight = window.innerHeight > 400 ? 400 : window.innerHeight - 20;

  // Устанавливаем размеры canvas
  canvas.width = maxWidth;
  canvas.height = maxHeight;

  // Обновляем константы в зависимости от размера экрана
  GROUND_Y = canvas.height * 0.77; // 77% от высоты экрана
  console.log("Canvas size:", canvas.width, "x", canvas.height, "GROUND_Y:", GROUND_Y);

  // Обновляем размер бобра, если он уже создан
  if (beaver) {
    beaver.updateSize();
  }
}

// --------------------
// Покадровый бобр
// --------------------
const beaverFrames = [];
const beaverSVGs = [
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-30 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(6 130 102)"/><ellipse cx="160" cy="90" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(20 188 105)"/><g><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-10 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(-3 130 102)"/><ellipse cx="160" cy="92" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(10 188 105)"/><g><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(10 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(-3 130 102)"/><ellipse cx="160" cy="92" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-10 188 105)"/><g><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(20 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(-12 130 102)"/><ellipse cx="160" cy="90" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-30 188 105)"/><g><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/></g></svg>`
];

// Кадры для прыжка
const jumpFrames = [];
const jumpSVGs = [
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="95" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-45 128 95)"/><rect x="40" y="75" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(15 130 92)"/><ellipse cx="160" cy="80" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="95" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(35 188 95)"/><g><ellipse cx="235" cy="68" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="40" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="65" r="3.5" fill="#000"/><circle cx="264" cy="76" r="3.5" fill="#000"/><rect x="250" y="80" width="5" height="10" fill="#fff"/><rect x="255" y="80" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="85" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-60 128 85)"/><rect x="40" y="65" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(25 130 82)"/><ellipse cx="160" cy="70" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="85" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(50 188 85)"/><g><ellipse cx="235" cy="58" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="30" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="55" r="3.5" fill="#000"/><circle cx="264" cy="66" r="3.5" fill="#000"/><rect x="250" y="70" width="5" height="10" fill="#fff"/><rect x="255" y="70" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="85" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-60 128 85)"/><rect x="40" y="65" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(25 130 82)"/><ellipse cx="160" cy="70" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="85" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(50 188 85)"/><g><ellipse cx="235" cy="58" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="30" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="55" r="3.5" fill="#000"/><circle cx="264" cy="66" r="3.5" fill="#000"/><rect x="250" y="70" width="5" height="10" fill="#fff"/><rect x="255" y="70" width="5" height="10" fill="#fff"/></g></svg>`
];

// Кадры для столкновения (бобёр пьянеет)
const collisionFrames = [];
const collisionSVGs = [
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-30 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(6 130 102)"/><ellipse cx="160" cy="90" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(20 188 105)"/><g transform="rotate(5 160 90)"><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-20 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(12 130 102)"/><ellipse cx="160" cy="90" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(30 188 105)"/><g transform="rotate(15 160 90)"><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-10 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(20 130 102)"/><ellipse cx="160" cy="90" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(40 188 105)"/><g transform="rotate(25 160 90)"><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(0 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(30 130 102)"/><ellipse cx="160" cy="90" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(50 188 105)"/><g transform="rotate(35 160 90)"><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/><circle cx="245" cy="65" r="4" fill="#ff0000"/><circle cx="260" cy="75" r="4" fill="#ff0000"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(10 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(40 130 102)"/><ellipse cx="160" cy="90" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(60 188 105)"/><g transform="rotate(45 160 90)"><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/><circle cx="245" cy="65" r="5" fill="#ff0000"/><circle cx="260" cy="75" r="5" fill="#ff0000"/><path d="M220 85 Q235 95 250 85" stroke="#ff0000" stroke-width="2" fill="none"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(20 128 105)"/><rect x="40" y="85" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(50 130 102)"/><ellipse cx="160" cy="90" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="105" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(70 188 105)"/><g transform="rotate(55 160 90)"><ellipse cx="235" cy="78" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="50" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="75" r="3.5" fill="#000"/><circle cx="264" cy="86" r="3.5" fill="#000"/><rect x="250" y="90" width="5" height="10" fill="#fff"/><rect x="255" y="90" width="5" height="10" fill="#fff"/><circle cx="245" cy="65" r="6" fill="#ff0000"/><circle cx="260" cy="75" r="6" fill="#ff0000"/><path d="M215 85 Q235 100 255 85" stroke="#ff0000" stroke-width="2" fill="none"/><circle cx="160" cy="95" r="3" fill="#ff0000"/></g></svg>`
];

// Превращаем SVG в Image
beaverSVGs.forEach((svg, index) => {
  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(svg);
  beaverFrames.push(img);
});

jumpSVGs.forEach((svg, index) => {
  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(svg);
  jumpFrames.push(img);
});

collisionSVGs.forEach((svg, index) => {
  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(svg);
  collisionFrames.push(img);
});

console.log("SVG images created:", beaverFrames.length, jumpFrames.length, collisionFrames.length);

let currentFrame = 0;
let currentJumpFrame = 0;
let currentCollisionFrame = 0;
let collisionAnimationActive = false;

setInterval(() => {
    currentFrame = (currentFrame + 1) % beaverFrames.length;
    currentJumpFrame = (currentJumpFrame + 1) % jumpFrames.length;
    if(collisionAnimationActive) {
        if(currentCollisionFrame < collisionFrames.length - 1) {
            currentCollisionFrame = (currentCollisionFrame + 1);
        }
    }
}, 80);

// --------------------
// Звуковые эффекты
// --------------------
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playJump() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = 450;
  osc.type = "square";
  gain.gain.value = 0.12;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.12);
}

function playDrunk() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = 200;
  osc.type = "sine";
  gain.gain.value = 0.15;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
  osc.stop(audioCtx.currentTime + 0.3);
}

// --------------------
// Бобр
// --------------------
const beaver = {
  x: 10, 
  y: 0,
  w: 120, 
  h: 70, 
  vy: 0,
  jumps: 0,
  maxJumps: 2,

  updateSize() {
    const scale = Math.min(canvas.width / 800, canvas.height / 400);
    this.w = 100 * scale;
    this.h = 60 * scale;
    this.y = GROUND_Y - this.h;
    console.log("Beaver size updated:", this.w, this.h, "y:", this.y);
  },

  jump() { 
    if(this.jumps < this.maxJumps && !gameOver && !collisionAnimationActive){ 
      if(this.y >= GROUND_Y - this.h) {
        this.jumps = 0;
      }
      this.jumps++;
      this.vy = JUMP * (this.jumps === 1 ? 1 : 0.8);
      playJump(); 
    } 
  },

  update() { 
    if(!gameOver && !collisionAnimationActive) {
      this.vy += GRAVITY; 
      this.y += this.vy; 
      if(this.y > GROUND_Y - this.h){ 
        this.y = GROUND_Y - this.h; 
        this.vy = 0; 
        this.jumps = 0;
      } 
    }
  },

  draw() { 
    if(collisionAnimationActive) {
      ctx.drawImage(collisionFrames[currentCollisionFrame], this.x, this.y, this.w, this.h);
    } 
    else if(this.y < GROUND_Y - this.h) {
      ctx.drawImage(jumpFrames[currentJumpFrame], this.x, this.y, this.w, this.h);
    } 
    else {
      ctx.drawImage(beaverFrames[currentFrame], this.x, this.y, this.w, this.h);
    }
  }
};

// --------------------
// Бутылки
// --------------------
const obstacles = [];
let frameCount = 0;

function createBottleSVG(type) {
  const color = type === "beer" ? "#D4AF37" : "#4169E1";
  const capColor = type === "beer" ? "#FFD700" : "#191970";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200">
    <rect x="30" y="20" width="40" height="160" rx="10" fill="${color}"/>
    <rect x="35" y="10" width="30" height="20" fill="${capColor}"/>
    <rect x="45" y="5" width="10" height="10" fill="${capColor}"/>
    <text x="50" y="120" text-anchor="middle" fill="white" font-size="20" font-weight="bold">${type === "beer" ? "🍺" : "🍾"}</text>
  </svg>`;
}

function spawnObstacle() {
  const flying = Math.random() < 0.3;
  const type = Math.random() < 0.5 ? 'beer' : 'vodka';
  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(createBottleSVG(type));

  const scale = Math.min(canvas.width / 800, canvas.height / 400);
  const baseWidth = flying ? 40 : 30;
  const baseHeight = flying ? 40 : 80;
  const baseY = flying ? 90 : GROUND_Y - 70;

  obstacles.push({
    x: canvas.width,
    y: baseY * scale,
    w: baseWidth * scale,
    h: baseHeight * scale,
    img,
    flying,
    angle: 0
  });
}

// --------------------
// Фон
// --------------------
function drawBackground() {
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
function drawStartScreen() {
  drawBackground();
  
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

// --------------------
// Основной игровой цикл
// --------------------
function reset() {
  console.log("Game reset");
  
  // Сохраняем счет, если игра завершилась
  if (gameOver && score > 0) {
    saveScore(score);
  }
  
  obstacles.length = 0;
  score = 0;
  gameOver = false;
  collisionAnimationActive = false;
  currentCollisionFrame = 0;
  frameCount = 0;
  speed = 5;
  beaver.updateSize();
  beaver.vy = 0;
  beaver.jumps = 0;
}

function update() {
  // Если игра на стартовом экране
  if (startScreen) {
    drawStartScreen();
    requestAnimationFrame(update);
    return;
  }
  
  drawBackground();

  // Рисуем бобра
  beaver.update();
  beaver.draw();

  // Генерируем препятствия
  if(!gameOver && !collisionAnimationActive) {
    frameCount++;
    if(frameCount % 80 === 0) {
      spawnObstacle();
    }

    // Увеличиваем скорость каждые 200 очков
    if(frameCount % 200 === 0) {
      speed += 0.5;
    }

    // Увеличиваем счёт
    if(frameCount % 10 === 0) {
      score++;
    }
  }

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
    ctx.drawImage(o.img, -o.w/2, -o.h/2, o.w, o.h);
    ctx.restore();

    // Проверка столкновения
    if(beaver.x < o.x + o.w && 
       beaver.x + beaver.w > o.x && 
       beaver.y < o.y + o.h && 
       beaver.y + beaver.h > o.y && 
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

  // Отображение счета
  ctx.fillStyle = "#000";
  ctx.font = "18px monospace";
  ctx.fillText("Score: " + score, 10, 24);
  
  // Отображение лучшего счета
  const highScore = getHighScore();
  if (highScore > 0) {
    ctx.fillText("Best: " + highScore, 10, 44);
  }

  // Сообщение о завершении игры
  if(gameOver){
    ctx.fillStyle = "#000";
    ctx.font = "18px monospace";
    ctx.fillText("НАБУХАЛСЯ", canvas.width/2 - 70, 110);
    ctx.fillText(`Ты смог не бухать ${score} шагов`, canvas.width/2 - 110, 130);
    ctx.fillText("Нажми чтобы перезапустить", canvas.width/2 - 105, 150);
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
    beaver.jump();
  }
});

// Функции для работы с результатами
function saveScore(score) {
  try {
    if (tg) {
      // Сохраняем результат через Telegram Web App
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        console.log(`Saving score ${score} for user ${userData.first_name}`);
        // Здесь можно добавить отправку данных на сервер
        // Для демонстрации просто выводим в консоль
      }
    } else {
      // Сохраняем в localStorage для не-Telegram версии
      const highScore = localStorage.getItem('beaver_high_score') || 0;
      if (score > highScore) {
        localStorage.setItem('beaver_high_score', score);
        console.log(`New high score: ${score}`);
      }
    }
  } catch (e) {
    console.error("Error saving score:", e);
  }
}

function getHighScore() {
  try {
    if (tg) {
      // Получаем лучший результат из Telegram Web App
      // Для демонстрации возвращаем 0
      return 0;
    } else {
      // Получаем из localStorage
      return localStorage.getItem('beaver_high_score') || 0;
    }
  } catch (e) {
    console.error("Error getting high score:", e);
    return 0;
  }
}

// Инициализация игры
function initGame() {
  console.log("Initializing game...");
  
  // Сначала инициализируем canvas
  resizeCanvas();
  
  // Устанавливаем обработчик изменения размера окна
  window.addEventListener('resize', resizeCanvas);
  
  // Инициализируем бобра
  beaver.updateSize();
  
  // Сбрасываем состояние игры
  reset();
  
  // Запускаем игровой цикл
  console.log("Starting game loop...");
  update();
}

// Запускаем игру когда DOM загружен
document.addEventListener('DOMContentLoaded', initGame);