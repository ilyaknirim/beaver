const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 260;

const GROUND_Y = 200;
const GRAVITY = 0.6;
const JUMP = -12;

let speed = 6;
let score = 0;
let gameOver = false;

// Создаем несколько кадров анимации бобра
const beaverFrames = [];
for (let i = 0; i < 4; i++) {
  const frame = new Image();
  frame.src = `beaver_frame${i}.svg`;
  beaverFrames.push(frame);
}

// Текущий кадр анимации
let currentFrame = 0;
let frameCounter = 0;

const beerImg = new Image();
beerImg.src = "beer.svg";

const vodkaImg = new Image();
vodkaImg.src = "vodka.svg";

// Web Audio jump sound
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playJump() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = 420;
  osc.type = "square";
  gain.gain.value = 0.1;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

const beaver = {
  x: 60, y: GROUND_Y - 50, w: 80, h: 60, vy: 0, // Увеличим ширину для сохранения пропорций
  jump() {
    if (this.y >= GROUND_Y - this.h) {
      this.vy = JUMP;
      playJump();
    }
  },
  update() {
    this.vy += GRAVITY;
    this.y += this.vy;
    if (this.y > GROUND_Y - this.h) {
      this.y = GROUND_Y - this.h;
      this.vy = 0;
    }
    
    // Обновляем кадр анимации
    frameCounter++;
    if (frameCounter % 8 === 0) {
      currentFrame = (currentFrame + 1) % beaverFrames.length;
    }
  },
  draw() {
    // Рисуем текущий кадр
    if (beaverFrames[currentFrame] && beaverFrames[currentFrame].complete) {
      ctx.drawImage(beaverFrames[currentFrame], this.x, this.y, this.w, this.h);
    } else {
      // Если изображение не загрузилось, рисуем заглушку
      ctx.fillStyle = "#8b5a2b";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
};

const obstacles = [];

function spawnObstacle() {
  const flying = Math.random() < 0.3;
  obstacles.push({
    x: canvas.width,
    y: flying ? 90 : GROUND_Y - 70,
    w: flying ? 40 : 30,
    h: flying ? 40 : 80,
    img: flying ? vodkaImg : (Math.random() < 0.5 ? beerImg : vodkaImg),
    flying,
    angle: 0
  });
}

function reset() {
  obstacles.length = 0;
  score = 0;
  speed = 6;
  gameOver = false;
}

function drawBackground() {
  // ground
  ctx.fillStyle = "#c2a26c";
  ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  if (!gameOver) {
    score++;
    if (score % 600 === 0) speed += 0.5;
  }

  beaver.update();
  beaver.draw();

  if (!gameOver && Math.random() < 0.02) spawnObstacle();

  obstacles.forEach((o, i) => {
    o.x -= speed;
    ctx.save();
    ctx.translate(o.x + o.w / 2, o.y + o.h / 2);
    if (o.flying) {
      o.angle += 0.1;
      ctx.rotate(o.angle);
    }
    ctx.drawImage(o.img, -o.w / 2, -o.h / 2, o.w, o.h);
    ctx.restore();

    if (
      beaver.x < o.x + o.w &&
      beaver.x + beaver.w > o.x &&
      beaver.y < o.y + o.h &&
      beaver.y + beaver.h > o.y
    ) gameOver = true;

    if (o.x + o.w < 0) obstacles.splice(i, 1);
  });

  ctx.fillStyle = "#000";
  ctx.font = "16px monospace";
  ctx.fillText("Score: " + score, 10, 20);

  if (gameOver) {
    ctx.fillText("GAME OVER", canvas.width / 2 - 50, 110);
    ctx.fillText("Tap to restart", canvas.width / 2 - 70, 130);
  }

  requestAnimationFrame(update);
}

canvas.addEventListener("touchstart", () => gameOver ? reset() : beaver.jump());
canvas.addEventListener("mousedown", () => gameOver ? reset() : beaver.jump());

update();
