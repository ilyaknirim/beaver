const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 260;

const GROUND_Y = 200;
const GRAVITY = 0.6;
const JUMP = -14;
let speed = 8;
let score = 0;
let gameOver = false;

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
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="85" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-60 128 85)"/><rect x="40" y="65" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(25 130 82)"/><ellipse cx="160" cy="70" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="85" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(50 188 85)"/><g><ellipse cx="235" cy="58" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="30" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="55" r="3.5" fill="#000"/><circle cx="264" cy="66" r="3.5" fill="#000"/><rect x="250" y="70" width="5" height="10" fill="#fff"/><rect x="255" y="70" width="5" height="10" fill="#fff"/></g></svg>`,
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 160" width="280" height="160"><rect x="120" y="95" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(-45 128 95)"/><rect x="40" y="75" width="90" height="34" rx="12" fill="#6b4423" transform="rotate(15 130 92)"/><ellipse cx="160" cy="80" rx="60" ry="38" fill="#8b5a2b"/><rect x="180" y="95" width="16" height="38" rx="7" fill="#5a3a1a" transform="rotate(35 188 95)"/><g><ellipse cx="235" cy="68" rx="28" ry="26" fill="#8b5a2b"/><ellipse cx="220" cy="40" rx="7" ry="7" fill="#7a4a24"/><circle cx="240" cy="65" r="3.5" fill="#000"/><circle cx="264" cy="76" r="3.5" fill="#000"/><rect x="250" y="80" width="5" height="10" fill="#fff"/><rect x="255" y="80" width="5" height="10" fill="#fff"/></g></svg>`
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
beaverSVGs.forEach(svg=>{
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svg);
    beaverFrames.push(img);
});

jumpSVGs.forEach(svg=>{
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svg);
    jumpFrames.push(img);
});

collisionSVGs.forEach(svg=>{
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svg);
    collisionFrames.push(img);
});

let currentFrame = 0;
let currentJumpFrame = 0;
let currentCollisionFrame = 0;
let collisionAnimationActive = false;
setInterval(() => {
    currentFrame = (currentFrame + 1) % beaverFrames.length;
    currentJumpFrame = (currentJumpFrame + 1) % jumpFrames.length;
    if(collisionAnimationActive) {
        // Анимация продолжается до последнего кадра, но не зацикливается
        if(currentCollisionFrame < collisionFrames.length - 1) {
            currentCollisionFrame = (currentCollisionFrame + 1);
        }
        // Анимация не останавливается, флаг collisionAnimationActive остается true
        // Это значит, что бобёр останется в последнем кадре анимации до перезапуска
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
  x: 10, y: GROUND_Y-60, w: 120, h: 70, vy:0,
  jump() { if(this.y>=GROUND_Y-this.h && !gameOver && !collisionAnimationActive){ this.vy=JUMP; playJump(); } },
  update() { 
    if(!gameOver && !collisionAnimationActive) {
      this.vy += GRAVITY; 
      this.y += this.vy; 
      if(this.y>GROUND_Y-this.h){ 
        this.y=GROUND_Y-this.h; 
        this.vy=0; 
      } 
    }
  },
  draw() { 
    // Если активна анимация столкновения, используем её
    if(collisionAnimationActive) {
      ctx.drawImage(collisionFrames[currentCollisionFrame], this.x, this.y, this.w, this.h);
    } 
    // Если бобр в прыжке, используем кадры прыжка
    else if(this.y < GROUND_Y-this.h) {
      ctx.drawImage(jumpFrames[currentJumpFrame], this.x, this.y, this.w, this.h);
    } 
    // Иначе используем обычные кадры
    else {
      ctx.drawImage(beaverFrames[currentFrame], this.x, this.y, this.w, this.h);
    }
  }
};

// --------------------
// Бутылки
// --------------------
const obstacles = [];
function createBottleSVG(type) {
    if(type === 'beer') return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 120"><rect x="12" y="0" width="16" height="20" fill="#cfa15a"/><rect x="8" y="20" width="24" height="90" rx="8" fill="#2f8f2f"/><rect x="10" y="50" width="20" height="20" fill="#f5e663"/></svg>`;
    else return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 120"><rect x="14" y="0" width="12" height="20" fill="#ddd"/><rect x="8" y="20" width="24" height="90" rx="4" fill="#e6f2ff"/><rect x="10" y="55" width="20" height="18" fill="#cce0ff"/></svg>`;
}

function spawnObstacle() {
  const flying = Math.random()<0.3;
  const type = Math.random()<0.5?'beer':'vodka';
  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(createBottleSVG(type));
  obstacles.push({
    x: canvas.width,
    y: flying?90:GROUND_Y-70,
    w: flying?40:30,
    h: flying?40:80,
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
  ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height-GROUND_Y);
}

// --------------------
// Игра
// --------------------
function reset() {
    obstacles.length=0; score=0; speed=8; gameOver=false; collisionAnimationActive=false; currentCollisionFrame=0;
}

function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBackground();

  if(!gameOver && !collisionAnimationActive){ 
    score++; 
    if(score%500===0) speed+=0.5; 
  }

  beaver.update();
  beaver.draw();

  if(!gameOver && !collisionAnimationActive && Math.random()<0.02) spawnObstacle();

  obstacles.forEach((o,i)=>{
    // Двигаем препятствия только если игра не на паузе из-за столкновения
    if(!collisionAnimationActive && !gameOver) {
      o.x -= speed;
      if(o.flying){ o.angle += 0.15; }
    }

    ctx.save();
    ctx.translate(o.x + o.w/2, o.y + o.h/2);
    if(o.flying){ ctx.rotate(o.angle); }
    ctx.drawImage(o.img, -o.w/2, -o.h/2, o.w, o.h);
    ctx.restore();

    // Проверка столкновения
    if(beaver.x<o.x+o.w && beaver.x+beaver.w>o.x && beaver.y<o.y+o.h && beaver.y+beaver.h>o.y && !gameOver && !collisionAnimationActive) {
      collisionAnimationActive = true;
      currentCollisionFrame = 0;
      gameOver = true; // Сразу устанавливаем флаг завершения игры
      playDrunk(); // Воспроизводим звук опьянения
    }

    // Удаляем препятствия только если игра не на паузе
    if(!collisionAnimationActive && !gameOver && o.x+o.w<0) obstacles.splice(i,1);
  });

  ctx.fillStyle="#000";
  ctx.font="18px monospace";
  ctx.fillText("Score: "+score,10,24);

  if(gameOver){
    ctx.fillText("НАБУХАЛСЯ",canvas.width/2-70,110);
    ctx.fillText(`Ты смог не бухать ${score} шагов`,canvas.width/2-110,130);
    ctx.fillText("Нажми чтобы перезапустить",canvas.width/2-105,150);
  }

  requestAnimationFrame(update);
}

canvas.addEventListener("touchstart",()=>gameOver?reset():beaver.jump());
canvas.addEventListener("mousedown",()=>gameOver?reset():beaver.jump());

update();
