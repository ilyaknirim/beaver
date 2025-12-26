// Инициализация Telegram Web App
let tg;

function initTelegram() {
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
}

function getTelegram() {
  return tg;
}

export { initTelegram, getTelegram };
