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

// Превращаем SVG в Image
beaverSVGs.forEach(svg=>{
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svg);
    beaverFrames.push(img);
});

let currentFrame = 0;
setInterval(() => {
    currentFrame = (currentFrame + 1) % beaverFrames.length;
}, 80);

// --------------------
// Звук прыжка
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

// --------------------
// Бобр
// --------------------
const beaver = {
  x: 60, y: GROUND_Y-60, w: 120, h: 70, vy:0,
  jump() { if(this.y>=GROUND_Y-this.h){ this.vy=JUMP; playJump(); } },
  update() { this.vy += GRAVITY; this.y += this.vy; if(this.y>GROUND_Y-this.h){ this.y=GROUND_Y-this.h; this.vy=0; } },
  draw() { ctx.drawImage(beaverFrames[currentFrame], this.x, this.y, this.w, this.h); }
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
    obstacles.length=0; score=0; speed=8; gameOver=false;
}

function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBackground();

  if(!gameOver){ score++; if(score%500===0) speed+=0.5; }

  beaver.update();
  beaver.draw();

  if(!gameOver && Math.random()<0.02) spawnObstacle();

  obstacles.forEach((o,i)=>{
    o.x -= speed;
    ctx.save();
    ctx.translate(o.x + o.w/2, o.y + o.h/2);
    if(o.flying){ o.angle += 0.15; ctx.rotate(o.angle); }
    ctx.drawImage(o.img, -o.w/2, -o.h/2, o.w, o.h);
    ctx.restore();

    if(beaver.x<o.x+o.w && beaver.x+beaver.w>o.x && beaver.y<o.y+o.h && beaver.y+beaver.h>o.y) gameOver=true;
    if(o.x+o.w<0) obstacles.splice(i,1);
  });

  ctx.fillStyle="#000";
  ctx.font="18px monospace";
  ctx.fillText("Score: "+score,10,24);

  if(gameOver){
    ctx.fillText("GAME OVER",canvas.width/2-60,110);
    ctx.fillText("Tap to restart",canvas.width/2-80,130);
  }

  requestAnimationFrame(update);
}

canvas.addEventListener("touchstart",()=>gameOver?reset():beaver.jump());
canvas.addEventListener("mousedown",()=>gameOver?reset():beaver.jump());

update();
