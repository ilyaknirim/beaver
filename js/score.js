// Функции для работы с результатами
function saveScore(score, tg) {
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

function getHighScore(tg) {
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

export { saveScore, getHighScore };
