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

// Анимация теперь управляется из основного игрового цикла
function updateAnimation() {
    currentFrame = (currentFrame + 1) % beaverFrames.length;
    currentJumpFrame = (currentJumpFrame + 1) % jumpFrames.length;
    if(collisionAnimationActive) {
        if(currentCollisionFrame < collisionFrames.length - 1) {
            currentCollisionFrame = (currentCollisionFrame + 1);
        }
    }
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

// Функции для управления состоянием анимации
function setCollisionAnimationActive(value) {
  collisionAnimationActive = value;
}

function setCurrentCollisionFrame(value) {
  currentCollisionFrame = value;
}

export {
  beaver,
  currentFrame,
  currentJumpFrame,
  currentCollisionFrame,
  collisionAnimationActive,
  setCollisionAnimationActive,
  setCurrentCollisionFrame
};
