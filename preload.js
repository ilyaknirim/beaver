// Вызываем функцию предзагрузки изображений
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded, checking for preloadObstacleImages function");
  
  // Проверяем наличие функции перед вызовом
  setTimeout(function() {
    if (typeof preloadObstacleImages === "function") {
      console.log("Calling preloadObstacleImages function");
      preloadObstacleImages();
    } else {
      console.error("preloadObstacleImages function not found");
    }
  }, 100); // Небольшая задержка для уверенности, что game.js загружен
});