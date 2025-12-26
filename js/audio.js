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

export { playJump, playDrunk };
