// js/app.js
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o modelo
  const gameModel = new GameModel();
  
  // Inicializa as views
  const homeView = new HomeView();
  const levelSelectView = new LevelSelectView();
  const gameView = new GameView();
  const shopView = new ShopView();
  
  const views = {
    home: homeView,
    levelSelect: levelSelectView,
    game: gameView,
    shop: shopView
  };
  
  // Inicializa o controller
  const gameController = new GameController(gameModel, views);
  
  // Inicializa o avatar
  const avatar = new AvatarAssistant();
  gameController.setAvatar(avatar);
  
  // Inicia o jogo
  gameController.init();
  
  console.log('Jogo Sílabas Mágicas iniciado!');
});