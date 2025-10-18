// js/models/GameModel.js
class GameModel {
  constructor() {
    // Dados das fases e suas histórias
    this.levels = [
      { // Fase 1
        id: 1,
        name: 'Fase 1 - Coisas Simples',
        stories: [
          { storyId: 101, image: 'images/fase1/bola.png', word: 'BOLA', syllables: ['BO', 'LA', 'CA', 'SA'], reward: 10 },
          { storyId: 102, image: 'images/fase1/sapo.png', word: 'SAPO', syllables: ['SA', 'PO', 'LU', 'VA'], reward: 10 },
          { storyId: 103, image: 'images/fase1/mala.png', word: 'MALA', syllables: ['MA', 'LA', 'FO', 'CA'], reward: 10 },
          { storyId: 104, image: 'images/fase1/casa.png', word: 'CASA', syllables: ['CA', 'SA', 'BO', 'NE'], reward: 10 },
          { storyId: 105, image: 'images/fase1/pato.png', word: 'PATO', syllables: ['PA', 'TO', 'DA', 'DO'], reward: 10 }
        ]
      },
      { // Fase 2
        id: 2,
        name: 'Fase 2 - Animais',
        stories: [
          { storyId: 201, image: 'images/fase2/gato.png', word: 'GATO', syllables: ['GA', 'TO', 'PE', 'RA'], reward: 15 },
          { storyId: 202, image: 'images/fase2/vaca.png', word: 'VACA', syllables: ['VA', 'CA', 'FA', 'DA'], reward: 15 },
          { storyId: 203, image: 'images/fase2/cavalo.png', word: 'CAVALO', syllables: ['CA', 'VA', 'LO', 'PE', 'XE'], reward: 15 },
          { storyId: 204, image: 'images/fase2/macaco.png', word: 'MACACO', syllables: ['MA', 'CA', 'CO', 'BO', 'NA'], reward: 15 },
          { storyId: 205, image: 'images/fase2/leao.png', word: 'LEAO', syllables: ['LE', 'AO', 'TI', 'GRE'], reward: 15 } // Atenção ao ditongo 'AO' como sílaba
        ]
      },
      { // Fase 3
        id: 3,
        name: 'Fase 3 - Brinquedos',
        stories: [
          { storyId: 301, image: 'images/fase3/boneca.png', word: 'BONECA', syllables: ['BO', 'NE', 'CA', 'PI', 'PA'], reward: 20 },
          { storyId: 302, image: 'images/fase3/pipa.png', word: 'PIPA', syllables: ['PI', 'PA', 'BO', 'LA'], reward: 20 },
          { storyId: 303, image: 'images/fase3/carrinho.png', word: 'CARRINHO', syllables: ['CAR', 'RI', 'NHO', 'PE', 'AO'], reward: 20 },
          { storyId: 304, image: 'images/fase3/peteca.png', word: 'PETECA', syllables: ['PE', 'TE', 'CA', 'RO', 'DA'], reward: 20 },
          { storyId: 305, image: 'images/fase3/cubo.png', word: 'CUBO', syllables: ['CU', 'BO', 'DA', 'DO'], reward: 20 }
        ]
      },
      { // Fase 4
        id: 4,
        name: 'Fase 4 - Comidas',
        stories: [
          { storyId: 401, image: 'images/fase4/banana.png', word: 'BANANA', syllables: ['BA', 'NA', 'NA', 'MA', 'CA'], reward: 25 },
          { storyId: 402, image: 'images/fase4/maca.png', word: 'MACA', syllables: ['MA', 'CA', 'PE', 'RA'], reward: 25 }, // Atenção ao Ç
          { storyId: 403, image: 'images/fase4/pao.png', word: 'PAO', syllables: ['PAO', 'LEI', 'TE'], reward: 25 }, // Atenção ao ditongo 'AO'
          { storyId: 404, image: 'images/fase4/bolo.png', word: 'BOLO', syllables: ['BO', 'LO', 'SU', 'CO'], reward: 25 },
          { storyId: 405, image: 'images/fase4/laranja.png', word: 'LARANJA', syllables: ['LA', 'RAN', 'JA', 'U', 'VA'], reward: 25 }
        ]
      },
      { // Fase 5
        id: 5,
        name: 'Fase 5 - Natureza',
        stories: [
          { storyId: 501, image: 'images/fase5/sol.png', word: 'SOL', syllables: ['SOL', 'LUA', 'MAR'], reward: 30 },
          { storyId: 502, image: 'images/fase5/lua.png', word: 'LUA', syllables: ['LU', 'A', 'SOL', 'CEU'], reward: 30 },
          { storyId: 503, image: 'images/fase5/arvore.png', word: 'ARVORE', syllables: ['AR', 'VO', 'RE', 'FLOR', 'SOL'], reward: 30 },
          { storyId: 504, image: 'images/fase5/flor.png', word: 'FLOR', syllables: ['FLOR', 'MAR', 'CEU', 'RE'], reward: 30 },
          { storyId: 505, image: 'images/fase5/nuvem.png', word: 'NUVEM', syllables: ['NU', 'VEM', 'CHU', 'VA'], reward: 30 }
        ]
      },
      { // Fase Bônus
        id: 6,
        name: 'Fase Bônus - Desafio!',
        isBonus: true, // Flag para identificar a fase bônus
        stories: [ // Pode ter uma estrutura diferente ou desafios únicos
          { storyId: 601, image: 'images/bonus/desafio1.png', word: 'DESAFIO', syllables: ['DE', 'SA', 'FI', 'O', 'BONUS', 'EXTRA'], reward: 50 }
          // Adicionar mais desafios/histórias bônus se necessário
        ]
      }
    ];

    // Dados das skins (mantidos da versão anterior)
    this.skins = {
        'default_male': { name: 'Padrão Masculino', path: 'images/skins/default_male.png', price: 0 },
        'default_female': { name: 'Padrão Feminino', path: 'images/skins/default_female.png', price: 0 },
        'avatar_cavaleiro_cósmico': { name: 'Cavaleiro Cósmico', path: 'images/skins/avatar_cavaleiro_cósmico.png', price: 50 },
        'avatar_dragão': { name: 'Dragão', path: 'images/skins/avatar_dragão.png', price: 75 },
        'avatar_fada': { name: 'Fada', path: 'images/skins/avatar_fada.png', price: 50 },
        'avatar_fada_celestial': { name: 'Fada Celestial', path: 'images/skins/avatar_fada_celestial.png', price: 100 },
        'avatar_guerreiro_elemental': { name: 'Guerreiro Elemental', path: 'images/skins/avatar_guerreiro_elemental.png', price: 100 },
        'avatar_mago': { name: 'Mago', path: 'images/skins/avatar_mago.png', price: 75 },
        'avatar_pirata': { name: 'Pirata', path: 'images/skins/avatar_pirata.png', price: 50 },
        'avatar_princesa': { name: 'Princesa', path: 'images/skins/avatar_princesa.png', price: 75 },
        'avatar_rei': { name: 'Rei', path: 'images/skins/avatar_rei.png', price: 100 },
        'avatar_rainha': { name: 'Rainha', path: 'images/skins/avatar_rainha.png', price: 100 }
      };

    // Estado inicial do jogo (mantido da versão anterior)
    this.state = {
        username: 'jogador_teste',
        credits: 0,
        unlockedLevel: 1,
        ownedSkins: ['default_male', 'default_female'],
        currentSkin: 'default_male'
      };

    // Tenta carregar o estado do localStorage (mantido da versão anterior)
    this.loadState();
  }

  // --- Gerenciamento de Estado (mantido da versão anterior) ---
  loadState() {
    const savedState = localStorage.getItem(`silabasMagicas_${this.state.username}`);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        this.state = { ...this.state, ...parsedState };
        console.log('Estado do jogo carregado:', this.state);
      } catch (error) {
        console.error('Erro ao carregar o estado do jogo:', error);
        this.saveState();
      }
    } else {
      this.saveState();
    }
  }

  saveState() {
    try {
      localStorage.setItem(`silabasMagicas_${this.state.username}`, JSON.stringify(this.state));
      console.log('Estado do jogo salvo:', this.state);
    } catch (error) {
      console.error('Erro ao salvar o estado do jogo:', error);
    }
    // TODO: Implementar salvamento no backend via API
    // this.saveStateToAPI();
  }

  // --- Lógica das Fases (Atualizada) ---

  // Retorna os dados de uma fase específica pelo ID
  getLevelData(levelId) {
    return this.levels.find(level => level.id === levelId);
  }

  // Retorna uma história aleatória para uma fase específica
  getRandomStoryForLevel(levelId) {
    const level = this.getLevelData(levelId);
    if (!level || !level.stories || level.stories.length === 0) {
      return null; // Retorna null se a fase não tiver histórias
    }
    const randomIndex = Math.floor(Math.random() * level.stories.length);
    return level.stories[randomIndex];
  }

  // Marca uma fase como completa, desbloqueia a próxima e adiciona créditos
  completeLevel(levelId, storyReward) { // Agora recebe a recompensa da história
    if (!storyReward) {
        console.warn(`Recompensa não definida para a fase ${levelId} completada.`);
        storyReward = 0; // Define uma recompensa padrão ou busca no levelData se necessário
    }

    this.state.credits += storyReward;

    // Desbloqueia a próxima fase se ela existir e ainda não estiver desbloqueada
    const currentLevelIndex = this.levels.findIndex(l => l.id === levelId);
    if (currentLevelIndex !== -1 && currentLevelIndex + 1 < this.levels.length) {
        const nextLevelId = this.levels[currentLevelIndex + 1].id;
         if (this.state.unlockedLevel < nextLevelId) {
             this.state.unlockedLevel = nextLevelId;
         }
    }

    this.saveState();
  }

  // --- Lógica da Loja (mantida da versão anterior) ---
  getAvailableSkins() {
    return this.skins;
  }

  buySkin(skinId) {
    const skin = this.skins[skinId];
    if (!skin) return { success: false, message: 'Skin inválida!' };
    if (this.state.ownedSkins.includes(skinId)) return { success: false, message: 'Você já possui esta skin!' };
    if (this.state.credits < skin.price) return { success: false, message: 'Créditos insuficientes!' };

    this.state.credits -= skin.price;
    this.state.ownedSkins.push(skinId);
    this.saveState();
    return { success: true, message: `Skin "${skin.name}" comprada com sucesso!` };
  }

  equipSkin(skinId) {
    if (!this.skins[skinId]) return { success: false, message: 'Skin inválida!' };
    if (!this.state.ownedSkins.includes(skinId)) return { success: false, message: 'Você não possui esta skin!' };
    if (this.state.currentSkin === skinId) return { success: false, message: 'Esta skin já está equipada!' };

    this.state.currentSkin = skinId;
    this.saveState();
    const skinPath = this.skins[skinId]?.path;
    return { success: true, message: `Skin "${this.skins[skinId].name}" equipada!`, skinPath: skinPath };
  }

  getCurrentSkinPath() {
    return this.skins[this.state.currentSkin]?.path || this.skins['default_male'].path;
  }

  // --- Interação com API (mantida da versão anterior - exemplos) ---
  async loadStateFromAPI() { /* ... */ }
  async saveStateToAPI() { /* ... */ }
}