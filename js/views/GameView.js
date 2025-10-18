// js/views/GameView.js
class GameView {
  constructor() {
    this.gameContainer = document.getElementById('game-view');
    this.onLevelComplete = null;
    this.onBack = null;
    this.selectedSyllables = [];
    this.correctWord = '';
    this.levelId = null;
    this.currentStory = null; // Para armazenar a história atual

    // Garante o 'this' correto nos handlers de evento
    this.handleSyllableClick = this.handleSyllableClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
  }

  // Renderiza a tela do jogo com uma história aleatória da fase
  render(levelData, onLevelCompleteCallback) { // Renomeado para evitar conflito
    this.onLevelComplete = onLevelCompleteCallback; // Armazena o callback passado pelo controller

    // Verifica se há histórias disponíveis
    if (!levelData || !levelData.stories || levelData.stories.length === 0) {
      console.error('Dados da fase inválidos ou sem histórias:', levelData);
      this.gameContainer.innerHTML = `
        <div class="game-content error-message">
            Erro ao carregar a fase. Não foram encontradas histórias.
            <button id="back-to-levels-from-game" class="btn-back">⬅ Voltar</button>
        </div>`;
      // Vincula o botão voltar mesmo em caso de erro (o controller fará isso)
      return;
    }

    // Seleciona uma história aleatória
    const randomIndex = Math.floor(Math.random() * levelData.stories.length);
    this.currentStory = levelData.stories[randomIndex]; // Armazena a história atual

    this.selectedSyllables = [];
    this.correctWord = this.currentStory.word; // Palavra da história sorteada
    this.levelId = levelData.id;

    // Embaralha as sílabas da história sorteada
    const shuffledSyllables = [...this.currentStory.syllables].sort(() => Math.random() - 0.5);

    let syllablesHTML = shuffledSyllables.map(syllable =>
      `<button class="syllable-btn">${syllable}</button>`
    ).join('');

    // Monta o HTML usando os dados da história atual (this.currentStory)
    this.gameContainer.innerHTML = `
      <div class="game-content">
        <h3 class="level-title">${levelData.name}</h3>
        <img src="${this.currentStory.image}" alt="Imagem da história ${this.currentStory.storyId}" class="game-image">

        <div id="word-display-container">
            <div id="word-display" class="word-display"></div>
            <button id="backspace-button" class="btn-control btn-backspace" title="Apagar última sílaba">⌫</button>
        </div>

        <div class="syllables-container">${syllablesHTML}</div>

        <div class="game-controls">
             <button id="clear-button" class="btn-control btn-clear">Limpar</button>
             <button id="back-to-levels-from-game" class="btn-back">⬅ Voltar</button>
        </div>

        <div id="game-message" class="message-area"></div>
      </div>
    `;

    this.wordDisplayElement = this.gameContainer.querySelector('#word-display');
    this.messageElement = this.gameContainer.querySelector('#game-message');

    this.bindSyllableButtons();
    this.bindControlButtons();
    // O botão de voltar é vinculado separadamente pelo controller usando bindBackButton
  }

  // Vincula eventos de clique aos botões de sílaba
  bindSyllableButtons() {
    const syllableButtons = this.gameContainer.querySelectorAll('.syllable-btn');
    syllableButtons.forEach(button => {
      button.addEventListener('click', () => this.handleSyllableClick(button.textContent));
    });
  }

  // Vincula eventos aos botões de controle (Limpar, Apagar)
  bindControlButtons() {
    const clearButton = this.gameContainer.querySelector('#clear-button');
    const backspaceButton = this.gameContainer.querySelector('#backspace-button');

    if (clearButton) {
        clearButton.addEventListener('click', this.handleClearClick);
    }
    if (backspaceButton) {
        backspaceButton.addEventListener('click', this.handleBackspaceClick);
    }
  }

  // Ação ao clicar em uma sílaba
  handleSyllableClick(syllable) {
    this.clearMessage();
    // Não adiciona mais sílabas se a palavra já estiver completa
    if (this.selectedSyllables.join('').length >= this.correctWord.length) {
        return;
    }
    this.selectedSyllables.push(syllable);
    this.updateWordDisplay();

    const currentWord = this.selectedSyllables.join('');

    // Verifica se acertou
    if (currentWord === this.correctWord) {
      this.showMessage('Parabéns, você acertou!', 'success');
      this.disableButtons();
      setTimeout(() => {
        if (this.onLevelComplete && this.currentStory) {
          // Passa o ID da fase e a recompensa da história específica para o callback
          this.onLevelComplete(this.levelId, this.currentStory.reward);
        }
      }, 1200);
    }
    // Verifica se errou (formou uma palavra do tamanho correto, mas incorreta)
    else if (currentWord.length === this.correctWord.length) {
      this.showMessage('Você errou, tente novamente!', 'error');
       setTimeout(() => {
           this.handleClearClick(); // Limpa automaticamente após erro
       }, 1000);
    }
  }

    // Ação ao clicar no botão Limpar
    handleClearClick() {
        this.selectedSyllables = [];
        this.updateWordDisplay();
        this.clearMessage();
        this.enableButtons(); // Reabilita botões se limpou manualmente após erro
    }

    // Ação ao clicar no botão Apagar (⌫)
    handleBackspaceClick() {
        if (this.selectedSyllables.length > 0) {
            this.selectedSyllables.pop();
            this.updateWordDisplay();
            this.clearMessage();
            this.enableButtons(); // Reabilita botões ao apagar
        }
    }


  // Atualiza o display da palavra formada
  updateWordDisplay() {
    if (this.wordDisplayElement) {
        this.wordDisplayElement.textContent = this.selectedSyllables.join('');
    }
  }

  // Exibe uma mensagem na tela do jogo
  showMessage(text, type = 'info') {
    if (this.messageElement) {
        this.messageElement.textContent = text;
        this.messageElement.className = `message-area message-${type}`;
        this.messageElement.style.display = 'block';
    }
  }

  // Limpa a mensagem da tela
  clearMessage() {
    if (this.messageElement) {
        this.messageElement.textContent = '';
        this.messageElement.style.display = 'none';
        this.messageElement.className = 'message-area';
    }
  }

  // Desabilita os botões de sílaba e controle (exceto Voltar)
  disableButtons() {
    const buttons = this.gameContainer.querySelectorAll('.syllable-btn, #clear-button, #backspace-button');
    buttons.forEach(button => button.disabled = true);
  }

  // Habilita os botões de sílaba e controle (exceto Voltar)
  enableButtons() {
     const buttons = this.gameContainer.querySelectorAll('.syllable-btn, #clear-button, #backspace-button');
     buttons.forEach(button => button.disabled = false);
  }

  // Mostra a tela do jogo
  show() {
    this.gameContainer.style.display = 'block';
  }

  // Esconde a tela do jogo
  hide() {
    this.gameContainer.style.display = 'none';
    this.gameContainer.innerHTML = ''; // Limpa o conteúdo ao esconder
    this.onLevelComplete = null;
    this.onBack = null;
    this.currentStory = null; // Limpa a história atual
  }

  // Vincula a função de callback ao botão "Voltar"
  bindBackButton(handler) {
    this.onBack = handler;
    // Tenta vincular o botão APÓS o innerHTML ser definido no render.
    // O ideal é que o controller chame isso DEPOIS de chamar render.
    const backButton = this.gameContainer.querySelector('#back-to-levels-from-game');
    if (backButton && this.onBack) {
        // Remove listener antigo para evitar duplicatas, caso render seja chamado múltiplas vezes
        const newButton = backButton.cloneNode(true);
        backButton.parentNode.replaceChild(newButton, backButton);
        newButton.addEventListener('click', this.onBack);
        console.log('Botão Voltar vinculado no GameView');
    } else {
         // Se o botão não existe (ex: erro no render ou chamado antes), avisa.
         console.warn('Botão Voltar (#back-to-levels-from-game) não encontrado no GameView para vincular.');
    }
  }
}