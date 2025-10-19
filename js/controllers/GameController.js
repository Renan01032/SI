// js/controllers/GameController.js
class GameController {
  constructor(model, views) {
    this.model = model;
    this.views = views;
    this.avatar = null;

    this.showHome = this.showHome.bind(this);
    this.showLevelSelect = this.showLevelSelect.bind(this);
    this.showGame = this.showGame.bind(this);
    this.showShop = this.showShop.bind(this);
    this.handleLevelComplete = this.handleLevelComplete.bind(this);
    this.handleBuySkin = this.handleBuySkin.bind(this);
    this.handleEquipSkin = this.handleEquipSkin.bind(this);
  }

  init() {
    this.views.home.bindPlayButton(this.showLevelSelect);
    this.views.levelSelect.bindBackButton(this.showHome);
    this.views.shop.bindBackButton(this.showLevelSelect);
    this.views.levelSelect.bindShopButton(this.showShop);

    this.showHome();
  }

  _setBodyBackground(levelId = null) {
    const body = document.body;
    body.className = '';

    if (levelId === 1) {
      body.classList.add("game-background");
    } else if (levelId === 2) {
      body.classList.add("game-background-2");
    } else if (levelId === 3) {
      body.classList.add("game-background-3");
    } else {
      body.classList.add("default-background");
    }
  }

  _updateAllCredits() {
    const credits = this.model.state.credits;
    this.views.home.updateCredits(credits);
    this.views.levelSelect.updateCredits(credits);
    this.views.shop.updateCredits(credits);
  }

  _hideAllViews() {
    Object.values(this.views).forEach(view => view.hide());
  }

  setAvatar(avatarInstance) {
    this.avatar = avatarInstance;
  }

  showHome() {
    this._hideAllViews();
    this._updateAllCredits();
    this._setBodyBackground();
    this.views.home.show();

    if (this.avatar) {
      setTimeout(() => this.avatar.showRandomMessage('home'), 500);
    }
  }

  showLevelSelect() {
    this._hideAllViews();
    this._updateAllCredits();
    this._setBodyBackground();

    this.views.levelSelect.render(
      this.model.levels, 
      this.model.state.unlockedLevel, 
      this.showGame
    );

    this.views.levelSelect.show();

    if (this.avatar) {
      setTimeout(() => this.avatar.showRandomMessage('levelSelect'), 500);
    }
  }

  showGame(levelId) {
    const levelData = this.model.getLevelData(levelId);
    if (!levelData) {
      console.error(`Nível ${levelId} não encontrado.`);
      this.showLevelSelect();
      return;
    }

    this._hideAllViews();
    this._setBodyBackground(levelId);

    // CORREÇÃO: Passar callback corretamente
    this.views.game.render(levelData, this.handleLevelComplete);
    this.views.game.bindBackButton(this.showLevelSelect);
    this.views.game.show();

    if (this.avatar) {
      setTimeout(() => this.avatar.showRandomMessage('gameStart'), 500);
    }
  }

  showShop() {
    this._hideAllViews();
    this._updateAllCredits();
    this._setBodyBackground();

    const availableSkins = Object.values(this.model.getAvailableSkins());
    const ownedSkins = this.model.state.ownedSkins;
    const currentSkin = this.model.state.currentSkin;

    this.views.shop.render(
      availableSkins,
      ownedSkins,
      currentSkin,
      this.handleBuySkin,
      this.handleEquipSkin
    );

    this.views.shop.show();

    if (this.avatar) {
      setTimeout(() => this.avatar.showRandomMessage('shop'), 500);
    }
  }

  handleLevelComplete(levelId, reward) {
    console.log(`Fase ${levelId} completa! Recompensa: ${reward}`);
    this.model.completeLevel(levelId, reward);

    if (this.avatar) {
      this.avatar.celebrate();
      this.avatar.showRandomMessage('gameComplete');
    }

    setTimeout(() => {
      this.showLevelSelect();
    }, 1500);
  }

  handleBuySkin(skinId) {
    const result = this.model.buySkin(skinId);

    if (result.success) {
      this.views.shop.showMessage(result.message, "success");
      this._updateAllCredits();

      setTimeout(() => {
        this.showShop();
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

      if (this.avatar && result.skinPath) {
        this.avatar.changeSkin(result.skinPath);
        this.avatar.celebrate();
      }

      setTimeout(() => {
        this.showShop();
      }, 800);
    } else {
      this.views.shop.showMessage(result.message, "error");
    }
  }
}