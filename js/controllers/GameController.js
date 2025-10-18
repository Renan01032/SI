// js/controllers/GameController.js
class GameController {
  constructor(model, views) {
    this.model = model;
    this.views = views; // {home, levelSelect, game, shop}
    this.avatar = null; // Avatar será adicionado depois

    // Garante que o 'this' dentro das funções sempre se refira ao controller
    this.showHome = this.showHome.bind(this);
    this.showLevelSelect = this.showLevelSelect.bind(this);
    this.showGame = this.showGame.bind(this);
    this.showShop = this.showShop.bind(this);
    this.handleLevelComplete = this.handleLevelComplete.bind(this);
    this.handleBuySkin = this.handleBuySkin.bind(this);
    this.handleEquipSkin = this.handleEquipSkin.bind(this);
  }

  // Inicializa o jogo
  init() {
    // Vincula botões da Home
    this.views.home.bindPlayButton(this.showLevelSelect);

    // Vincula botões de Voltar principais
    this.views.levelSelect.bindBackButton(this.showHome);
    this.views.shop.bindBackButton(this.showLevelSelect);
    // O botão de voltar da GameView será vinculado dinamicamente em showGame

    // Vincula botão da Loja
    this.views.levelSelect.bindShopButton(this.showShop);

    // Inicia na tela inicial
    this.showHome();

    // Carrega dados do usuário da API (ou localStorage se falhar)
    // this.model.loadStateFromAPI().then(() => this._updateAllCredits()); // Descomente quando a API estiver pronta
  }

  // --- Funções Auxiliares ---

  // Define o background do body conforme a tela/fase
  _setBodyBackground(levelId = null) {
    const body = document.body;
    // Remove classes de background anteriores
    body.className = ''; // Limpa todas as classes anteriores

    if (levelId === 1) {
      body.classList.add("game-background");
    } else if (levelId === 2) {
      body.classList.add("game-background-2");
    } else if (levelId === 3) {
      body.classList.add("game-background-3");
    }
    // Adicione mais backgrounds para fases 4, 5 e bônus se necessário
    // else if (levelId === 4) { body.classList.add("game-background-4"); }
    // else if (levelId === 5) { body.classList.add("game-background-5"); }
    // else if (levelId === 6) { body.classList.add("game-background-bonus"); }
    else {
      // Telas Home, LevelSelect, Shop: background padrão
      body.classList.add("default-background");
    }
  }

  // Atualiza a exibição de créditos em todas as telas
  _updateAllCredits() {
    const credits = this.model.state.credits;
    this.views.home.updateCredits(credits);
    this.views.levelSelect.updateCredits(credits);
    this.views.shop.updateCredits(credits);
    // Adicionar atualização de créditos na GameView se necessário
  }

  // Esconde todas as telas
  _hideAllViews() {
    Object.values(this.views).forEach(view => view.hide());
  }

  // Adiciona o Avatar Assistant ao controlador
  setAvatar(avatarInstance) {
    this.avatar = avatarInstance;
    // Você pode querer exibir uma mensagem inicial aqui
    // if (this.avatar) { this.avatar.showRandomMessage('welcome'); }
  }

  // --- Navegação entre Telas ---

  showHome() {
    this._hideAllViews();
    this._updateAllCredits();
    this._setBodyBackground(); // Define background padrão
    this.views.home.show();

    if (this.avatar) {
      setTimeout(() => this.avatar.showRandomMessage('home'), 500);
    }
  }

  showLevelSelect() {
    this._hideAllViews();
    this._updateAllCredits();
    this._setBodyBackground(); // Define background padrão

    // Renderiza a grade de fases com dados atualizados do modelo
    // Passa this.showGame como callback para quando um nível for clicado
    this.views.levelSelect.render(this.model.levels, this.model.state.unlockedLevel, this.showGame);

    this.views.levelSelect.show();

    if (this.avatar) {
      setTimeout(() => this.avatar.showRandomMessage('levelSelect'), 500);
    }
  }

  showGame(levelId) {
    const levelData = this.model.getLevelData(levelId);
    if (!levelData) {
        console.error(`Dados para o nível ${levelId} não encontrados.`);
        // Talvez mostrar uma mensagem de erro ou voltar para a seleção de fases
        this.showLevelSelect();
        return;
    }
    if (!levelData.stories || levelData.stories.length === 0) {
        console.error(`Nível ${levelId} não possui histórias definidas.`);
        // Talvez mostrar uma mensagem de erro ou voltar para a seleção de fases
        this.showLevelSelect();
        return;
    }


    this._hideAllViews();
    this._setBodyBackground(levelId); // Define background da fase

    // Renderiza a tela do jogo, passando o callback handleLevelComplete
    // O callback agora espera levelId e reward
    this.views.game.render(levelData, (id, reward) => this.handleLevelComplete(id, reward));

    // Vincula o botão Voltar DEPOIS de renderizar o conteúdo da GameView
    this.views.game.bindBackButton(this.showLevelSelect);

    this.views.game.show();

    if (this.avatar) {
      setTimeout(() => this.avatar.showRandomMessage('gameStart'), 500);
    }
  }

  showShop() {
    this._hideAllViews();
    this._updateAllCredits();
    this._setBodyBackground(); // Define background padrão

    // Pega os dados necessários para renderizar a loja
    const availableSkins = this.model.getAvailableSkins();
    const ownedSkins = this.model.state.ownedSkins;
    const currentSkin = this.model.state.currentSkin;

    // Renderiza a loja com callbacks para comprar e equipar
    this.views.shop.render(
      availableSkins,
      ownedSkins,
      currentSkin,
      this.handleBuySkin, // Passa a referência da função diretamente
      this.handleEquipSkin // Passa a referência da função diretamente
    );

    this.views.shop.show();

    if (this.avatar) {
      setTimeout(() => this.avatar.showRandomMessage('shop'), 500);
    }
  }

  // --- Handlers de Ações ---

  handleLevelComplete(levelId, reward) { // Recebe levelId e reward da GameView
    console.log(`Fase ${levelId} completa! Recompensa: ${reward}`);
    this.model.completeLevel(levelId, reward); // Passa a recompensa para o modelo

    if (this.avatar) {
      this.avatar.celebrate();
      this.avatar.showRandomMessage('gameComplete');
    }

    // Espera um pouco antes de voltar para a seleção de fases
    setTimeout(() => {
      this.showLevelSelect();
    }, 1500); // Tempo para o jogador ver a mensagem/celebração
  }

  handleBuySkin(skinId) {
    const result = this.model.buySkin(skinId);

    if (result.success) {
      this.views.shop.showMessage(result.message, "success");
      this._updateAllCredits(); // Atualiza créditos em todas as telas

      // Re-renderiza a loja para refletir a compra após um pequeno delay
      setTimeout(() => {
        this.showShop(); // Chama showShop para re-renderizar com dados atualizados
      }, 1000);

      if (this.avatar) {
        this.avatar.celebrate();
      }
    } else {
      this.views.shop.showMessage(result.message, "error");
    }
  }

  handleEquipSkin(skinId) {
    const result = this.model.equipSkin(skinId);

    if (result.success) {
      this.views.shop.showMessage(result.message, "success");

      // Atualiza a skin do avatar se existir
      if (this.avatar && result.skinPath) {
        this.avatar.changeSkin(result.skinPath);
        this.avatar.celebrate(); // Avatar celebra ao equipar nova skin
      }

      // Re-renderiza a loja para mostrar a skin equipada após um pequeno delay
      setTimeout(() => {
        this.showShop();
      }, 800);
    } else {
      this.views.shop.showMessage(result.message, "error");
    }
  }
}