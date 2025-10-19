// js/views/GameView.js
class GameView {
  constructor() {
    this.gameContainer = document.getElementById('game-view');
    this.onLevelComplete = null;
    this.onBack = null;
    this.currentLevel = null;
    this.currentStory = null;
    this.selectedCells = [];
    this.isGameComplete = false;

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
  }

  render(levelData, onLevelCompleteCallback) {
    this.onLevelComplete = onLevelCompleteCallback;
    this.currentLevel = levelData;
    
    if (!levelData || !levelData.stories || levelData.stories.length === 0) {
      console.error('Dados da fase inválidos:', levelData);
      this.showError();
      return;
    }

    // Seleciona história aleatória
    const randomIndex = Math.floor(Math.random() * levelData.stories.length);
    this.currentStory = levelData.stories[randomIndex];
    this.selectedCells = [];
    this.isGameComplete = false;

    this.renderGameInterface();
    this.bindEvents();
  }

  renderGameInterface() {
    const grid = this.generateWordSearchGrid();
    
    this.gameContainer.innerHTML = `
      <div class="game-card">
        <div class="game-header">
          <button id="back-to-levels-from-game" class="btn-back-header">⬅</button>
          <h2>${this.currentLevel.name}</h2>
        </div>

        <div class="reference-image-container">
          <img src="${this.currentStory.image}" alt="Imagem da história" class="reference-image">
        </div>

        <div class="objective-banner">
          Encontre a palavra: <strong>${this.currentStory.word}</strong>
        </div>

        <div class="syllable-info">
          <span class="hint-label">DICA</span>
          <button class="hint-button">💡</button>
        </div>

        <div class="hunt-section">
          <div class="hunt-header">CAÇA-SÍLABAS</div>
          <div class="grid-container">
            <div class="grid" id="word-search-grid">
              ${grid}
            </div>
          </div>
        </div>

        <div class="feedback" id="game-feedback"></div>

        <div class="game-controls">
          <button id="clear-button" class="btn-control btn-clear">Limpar Seleção</button>
        </div>
      </div>
    `;
  }

  generateWordSearchGrid() {
    const word = this.currentStory.word.toUpperCase();
    const syllables = this.currentStory.syllables;
    const gridSize = 8;
    let gridHTML = '';

    // Grid simples para demonstração - em um projeto real, implementar lógica de caça-palavras
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const randomChar = this.getRandomCharacter();
        gridHTML += `<div class="cell" data-row="${i}" data-col="${j}">${randomChar}</div>`;
      }
    }

    // Insere a palavra horizontalmente na primeira linha
    for (let i = 0; i < word.length && i < gridSize; i++) {
      const cell = this.gameContainer.querySelector(`.cell[data-row="0"][data-col="${i}"]`);
      if (cell) {
        cell.textContent = word[i];
        cell.dataset.letter = word[i];
      }
    }

    return gridHTML;
  }

  getRandomCharacter() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars[Math.floor(Math.random() * chars.length)];
  }

  bindEvents() {
    const cells = this.gameContainer.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.addEventListener('click', () => this.handleCellClick(cell));
    });

    const clearButton = this.gameContainer.querySelector('#clear-button');
    if (clearButton) {
      clearButton.addEventListener('click', this.handleClearClick);
    }

    this.bindBackButton(this.onBack);
  }

  handleCellClick(cell) {
    if (this.isGameComplete) return;

    const letter = cell.textContent;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // Verifica se a célula já foi selecionada
    const alreadySelected = this.selectedCells.some(selected => 
      selected.row === row && selected.col === col
    );

    if (!alreadySelected) {
      this.selectedCells.push({ row, col, letter });
      cell.classList.add('selecionada');
      
      this.checkWord();
    }
  }

  checkWord() {
    const selectedWord = this.selectedCells.map(cell => cell.letter).join('');
    const targetWord = this.currentStory.word.toUpperCase();

    if (selectedWord === targetWord) {
      this.isGameComplete = true;
      this.showFeedback('Parabéns! Você encontrou a palavra!', 'vitoria');
      this.highlightCorrectCells();
      
      setTimeout(() => {
        if (this.onLevelComplete && this.currentStory) {
          this.onLevelComplete(this.currentLevel.id, this.currentStory.reward);
        }
      }, 1500);
    } else if (selectedWord.length === targetWord.length) {
      this.showFeedback('Palavra incorreta! Tente novamente.', 'erro');
      setTimeout(() => {
        this.handleClearClick();
      }, 1000);
    }
  }

  highlightCorrectCells() {
    const cells = this.gameContainer.querySelectorAll('.cell');
    cells.forEach(cell => {
      if (cell.classList.contains('selecionada')) {
        cell.classList.add('correta');
        cell.classList.remove('selecionada');
      }
    });
  }

  handleClearClick() {
    this.selectedCells = [];
    const cells = this.gameContainer.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.remove('selecionada');
    });
    this.clearFeedback();
  }

  handleBackspaceClick() {
    if (this.selectedCells.length > 0) {
      const lastCell = this.selectedCells.pop();
      const cell = this.gameContainer.querySelector(
        `.cell[data-row="${lastCell.row}"][data-col="${lastCell.col}"]`
      );
      if (cell) {
        cell.classList.remove('selecionada');
      }
      this.clearFeedback();
    }
  }

  showFeedback(message, type) {
    const feedback = this.gameContainer.querySelector('#game-feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.className = `feedback ${type}`;
    }
  }

  clearFeedback() {
    const feedback = this.gameContainer.querySelector('#game-feedback');
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'feedback';
    }
  }

  showError() {
    this.gameContainer.innerHTML = `
      <div class="game-content error-message">
        Erro ao carregar a fase. Tente novamente.
        <button id="back-to-levels-from-game" class="btn-back">⬅ Voltar</button>
      </div>`;
    this.bindBackButton(this.onBack);
  }

  bindBackButton(handler) {
    this.onBack = handler;
    const backButton = this.gameContainer.querySelector('#back-to-levels-from-game');
    if (backButton && this.onBack) {
      // Remove listener antigo e adiciona novo
      const newButton = backButton.cloneNode(true);
      backButton.parentNode.replaceChild(newButton, backButton);
      newButton.addEventListener('click', this.onBack);
    }
  }

  show() {
    this.gameContainer.style.display = 'flex';
  }

  hide() {
    this.gameContainer.style.display = 'none';
    this.gameContainer.innerHTML = '';
    this.onLevelComplete = null;
    this.onBack = null;
    this.currentStory = null;
    this.currentLevel = null;
  }
}