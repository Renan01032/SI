// ============================================
// SISTEMA DE FASE OCULTA DO PIRATA
// ============================================

const PIRATA_LEVEL = {
  id: "pirata",
  nome: "A Aventura do Pirata Silábico",
  desbloqueada: false, // Se desbloqueada ao comprar skin
  requerSkinPirata: true,
  creditosRecompensa: 150,
  dificuldade: "Difícil",
  tema: "pirata",
}

// Verificar se a skin do pirata foi comprada
function verificarSkinPirata() {
  const skinsPirata = JSON.parse(localStorage.getItem("skinsPirata")) || []
  return skinsPirata.includes("pirata")
}

// Desbloquear fase ao comprar skin
function desbloquearFasePirata() {
  const fasesPirata = JSON.parse(localStorage.getItem("fasesPirata")) || []

  if (!fasesPirata.includes("pirata")) {
    fasesPirata.push("pirata")
    localStorage.setItem("fasesPirata", JSON.stringify(fasesPirata))

    // Notificação de desbloqueio
    mostrarNotificacaoDesbloqueio("Fase Pirata Desbloqueada!", "🏴‍☠️ A Aventura do Pirata Silábico foi desbloqueada!")
  }
}

// Mostrar notificação de desbloqueio
function mostrarNotificacaoDesbloqueio(titulo, mensagem) {
  const notificacao = document.createElement("div")
  notificacao.className = "notificacao-desbloqueio"
  notificacao.innerHTML = `
    <div class="notificacao-conteudo">
      <h3>${titulo}</h3>
      <p>${mensagem}</p>
      <button onclick="this.parentElement.parentElement.remove()">OK</button>
    </div>
  `
  document.body.appendChild(notificacao)

  setTimeout(() => {
    notificacao.style.opacity = "0"
    setTimeout(() => notificacao.remove(), 300)
  }, 3000)
}

// Dados da história do pirata
const HISTORIA_PIRATA = {
  titulo: "A Aventura do Pirata Silábico",
  descricao: "Ajude o Capitão Silábio a encontrar o tesouro legendário através das palavras mágicas!",
  background: "../images/pirata-background.png", // Você criará essa imagem
  imagem_historia: "../images/pirata-historia.png", // Você criará essa imagem

  historia: `
    <p>Era uma vez um jovem pirata chamado <strong>Capitão Silábio</strong> que navegava pelos mares em busca do tesouro mais valioso do mundo...</p>
    <p>Segundo a lenda, o tesouro estava guardado em uma caverna secreta protegida por três <strong>guardiões das sílabas mágicas</strong>.</p>
    <p>Para conseguir passar pelos guardiões, você precisa completar as tarefas silábicas e descobrir as palavras secretas!</p>
  `,

  desafios: [
    {
      numero: 1,
      titulo: "O Guardião da Praia",
      descricao: "O primeiro guardião quer que você forme a palavra TESOURO",
      silabas: ["TE", "SOU", "RO"],
      imagem: "../images/pirata-guardiao-1.png",
      historiaDesafio:
        'Um guardião misterioso aparece na praia com uma mensagem: "Encontre a palavra que começa com TE"',
    },
    {
      numero: 2,
      titulo: "O Guardião da Caverna",
      descricao: "O segundo guardião quer que você forme a palavra AVENTURA",
      silabas: ["A", "VEN", "TU", "RA"],
      imagem: "../images/pirata-guardiao-2.png",
      historiaDesafio: 'Dentro da caverna, um segundo guardião aparece: "Quem quer uma nova... ?"',
    },
    {
      numero: 3,
      titulo: "O Guardião Final",
      descricao: "O terceiro guardião quer que você forme a palavra VITÓRIA",
      silabas: ["VI", "TÓ", "RIA"],
      imagem: "../images/pirata-guardiao-3.png",
      historiaDesafio:
        'No coração da caverna, o guardião final brilha: "Consiga sua... ao encontrar a palavra secreta!"',
    },
  ],
}

// Puzzles de caça-sílabas para o tema pirata
const CACAS_PIRATA = [
  {
    numero: 1,
    grid: [
      ["N", "A", "V", "I", "O", "M", "P", "Q"],
      ["E", "T", "E", "S", "O", "U", "R", "O"],
      ["L", "B", "C", "R", "T", "E", "S", "A"],
      ["A", "D", "C", "A", "V", "E", "N", "T"],
      ["D", "V", "A", "N", "T", "U", "R", "A"],
      ["O", "P", "I", "R", "A", "T", "A", "K"],
      ["R", "M", "O", "U", "R", "O", "M", "L"],
      ["O", "C", "O", "F", "R", "I", "O", "M"],
    ],
    palavras: ["NAVIO", "TESOURO", "AVENTURA", "PIRATA", "OURO"],
  },
  {
    numero: 2,
    grid: [
      ["M", "A", "R", "E", "S", "A", "B", "I"],
      ["V", "E", "L", "A", "S", "C", "D", "E"],
      ["C", "A", "P", "I", "T", "Ã", "O", "F"],
      ["T", "B", "O", "N", "D", "A", "E", "G"],
      ["X", "N", "D", "A", "P", "A", "T", "H"],
      ["P", "R", "A", "I", "A", "T", "R", "E"],
      ["L", "M", "O", "C", "O", "R", "O", "M"],
      ["K", "S", "A", "Q", "N", "I", "Z", "W"],
    ],
    palavras: ["MARES", "VELAS", "CAPITÃO", "PRAIA", "MOURO"],
  },
]

// Dados de recompensa
const RECOMPENSA_PIRATA = {
  creditosPorConcluir: 150,
  items: [
    { nome: "Chapéu do Pirata", tipo: "skin", raridade: "épica" },
    { nome: "Mapa do Tesouro", tipo: "achievement", raridade: "lendária" },
  ],
}

// Função para iniciar a fase do pirata
function iniciarFasePirata() {
  // Verificar se a skin foi comprada
  if (!verificarSkinPirata()) {
    mostrarNotificacaoDesbloqueio("Fase Bloqueada", "Você precisa comprar a Skin do Pirata para acessar essa fase!")
    return
  }

  // Mostrar a história do pirata
  exibirHistoriaPirata()
}

// Exibir história com estilo pirata
function exibirHistoriaPirata() {
  const gameView = document.getElementById("game-view")
  const gameContent = `
    <div id="game-view-content" style="background: #2C1810; color: #F4E4C1;">
      <div class="fase-header" style="background: linear-gradient(90deg, #1a0f08, #5a3a2a); border: 3px solid #FFD700;">
        <h2>🏴‍☠️ ${HISTORIA_PIRATA.titulo}</h2>
        <p style="font-size: 0.9rem;">Dificuldade: ${PIRATA_LEVEL.dificuldade}</p>
      </div>

      <div class="imagem-historia">
        <img src="${HISTORIA_PIRATA.background}" alt="Piratas" style="border: 3px solid #8B4513;">
      </div>

      <div class="texto-historia" style="background: rgba(255, 212, 109, 0.1); padding: 15px; border-radius: 10px; border-left: 4px solid #FFD700;">
        ${HISTORIA_PIRATA.historia}
      </div>

      <div style="text-align: center; margin: 20px 0;">
        <button class="btn-iniciar-desafios" style="background: linear-gradient(90deg, #d4af37, #ffd700); color: #000; padding: 15px 30px; font-weight: bold; border: none; border-radius: 10px; cursor: pointer; font-size: 1.1rem;">
          ⚔️ Começar a Aventura
        </button>
      </div>
    </div>
  `

  gameView.innerHTML = gameContent
  gameView.style.display = "flex"

  document.querySelector(".btn-iniciar-desafios").addEventListener("click", () => {
    iniciarDesafioPirata(1)
  })
}

// Função para exibir cada desafio do pirata
function iniciarDesafioPirata(numeroDesafio) {
  const desafio = HISTORIA_PIRATA.desafios[numeroDesafio - 1]
  const gameView = document.getElementById("game-view")

  const gameContent = `
    <div id="game-view-content" style="background: #2C1810; color: #F4E4C1;">
      <div class="fase-header" style="background: linear-gradient(90deg, #5a3a2a, #8B4513); border: 3px solid #FFD700;">
        <h2>🗡️ Desafio ${numeroDesafio}/3: ${desafio.titulo}</h2>
      </div>

      <div style="text-align: center; margin: 15px 0; font-size: 1.1rem; color: #FFD700;">
        ${desafio.historiaDesafio}
      </div>

      <div class="caca-silabas" style="background: #3a2818; border: 2px solid #FFD700; color: #F4E4C1;">
        <p style="text-align: center; margin-bottom: 15px;"><strong>📜 Encontre a palavra:</strong></p>
        <div id="palavra-alvo" style="text-align: center; font-size: 1.3rem; font-weight: bold; color: #FFD700; margin-bottom: 15px;">
          ❓ ${desafio.silabas.length} sílabas para descobrir
        </div>
        
        <div id="silabas-encontradas" style="text-align: center; margin-bottom: 15px; min-height: 40px;">
          <!-- Sílabas encontradas aparecem aqui -->
        </div>

        <div class="grid" style="background: #1a0f08; padding: 10px; border-radius: 10px;">
          <!-- Grid de caça-sílabas será preenchido -->
        </div>

        <div style="text-align: center; margin-top: 15px;">
          <button class="btn-confirmar-pirata" style="background: #FFD700; color: #000; padding: 10px 20px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer;">
            ✓ Confirmar
          </button>
          <button class="btn-dica-pirata" style="background: #8B4513; color: #FFD700; padding: 10px 20px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; margin-left: 10px;">
            💡 Dica
          </button>
        </div>
      </div>

      <div id="feedback-pirata" style="margin-top: 15px; padding: 10px; border-radius: 10px; font-weight: bold; min-height: 40px; text-align: center;">
      </div>

      <div style="margin-top: 20px;">
        <button class="btn-voltar-pirata" style="background: #5a5a5a; color: #fff; padding: 10px 20px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; width: 100%;">
          ⬅ Voltar
        </button>
      </div>
    </div>
  `

  gameView.innerHTML = gameContent
  gameView.style.background = 'url("../images/pirata-background.png") no-repeat center center'
  gameView.style.backgroundSize = "cover"

  // Inicializar o jogo do desafio
  inicializarDesafioPirataJogo(numeroDesafio)
}

function inicializarDesafioPirataJogo(numeroDesafio) {
  const desafio = HISTORIA_PIRATA.desafios[numeroDesafio - 1]
  const cacaAtual = CACAS_PIRATA[numeroDesafio - 1]

  const silabaSelecionada = []
  let acertou = false

  // Preencher grid
  const gridElement = document.querySelector(".grid")
  cacaAtual.grid.forEach((linha, i) => {
    linha.forEach((letra, j) => {
      const cell = document.createElement("div")
      cell.className = "cell"
      cell.textContent = letra
      cell.style.background = "#2C1810"
      cell.style.color = "#FFD700"
      cell.style.border = "2px solid #FFD700"
      cell.id = `cell-${i}-${j}`

      cell.addEventListener("click", () => {
        if (!acertou) {
          cell.style.background = cell.style.background === "#2C1810" ? "#FFD700" : "#2C1810"
          cell.style.color = cell.style.color === "#FFD700" ? "#000" : "#FFD700"
        }
      })

      gridElement.appendChild(cell)
    })
  })

  // Botão confirmar
  document.querySelector(".btn-confirmar-pirata").addEventListener("click", () => {
    if (!acertou) {
      const feedback = document.getElementById("feedback-pirata")
      feedback.textContent = "✓ Correto! Você encontrou a palavra!"
      feedback.style.background = "#d4edda"
      feedback.style.color = "#155724"
      acertou = true

      setTimeout(() => {
        if (numeroDesafio < 3) {
          iniciarDesafioPirata(numeroDesafio + 1)
        } else {
          exibirVitoriaPirata()
        }
      }, 2000)
    }
  })

  // Botão dica
  document.querySelector(".btn-dica-pirata").addEventListener("click", () => {
    const feedback = document.getElementById("feedback-pirata")
    feedback.textContent = `💡 Dica: A palavra é ${desafio.silabas.join("-").toUpperCase()}`
    feedback.style.background = "#fff3cd"
    feedback.style.color = "#856404"
  })

  // Botão voltar
  document.querySelector(".btn-voltar-pirata").addEventListener("click", () => {
    exibirHistoriaPirata()
  })
}

// Tela de vitória
function exibirVitoriaPirata() {
  const gameView = document.getElementById("game-view")
  const creditosGanhos = RECOMPENSA_PIRATA.creditosPorConcluir

  gameView.innerHTML = `
    <div id="game-view-content" style="background: linear-gradient(135deg, #2C1810, #5a3a2a); color: #FFD700; text-align: center; padding: 40px 20px;">
      <h1 style="font-size: 3rem; margin-bottom: 20px;">🏴‍☠️ VITÓRIA! 🏴‍☠️</h1>
      
      <p style="font-size: 1.5rem; margin: 20px 0;">Você encontrou o tesouro legendário!</p>
      
      <div style="background: rgba(255, 215, 0, 0.2); padding: 20px; border-radius: 10px; border: 3px solid #FFD700; margin: 20px 0;">
        <h2 style="font-size: 2rem; margin-bottom: 10px;">💰 +${creditosGanhos} Créditos</h2>
        <p style="font-size: 1.2rem;">Parabéns, Capitão!</p>
      </div>

      <div style="background: rgba(139, 69, 19, 0.3); padding: 15px; border-radius: 10px; margin: 20px 0;">
        <p>Items Desbloqueados:</p>
        <p>🎩 Chapéu do Pirata</p>
        <p>🗺️ Mapa do Tesouro (Achievement)</p>
      </div>

      <button onclick="voltarAoMenu()" style="background: linear-gradient(90deg, #d4af37, #ffd700); color: #000; padding: 15px 40px; font-size: 1.2rem; font-weight: bold; border: none; border-radius: 10px; cursor: pointer; margin-top: 20px;">
        ⬅ Voltar ao Menu
      </button>
    </div>
  `
}

// Função auxiliar
function voltarAoMenu() {
  // Adicione a lógica para voltar ao menu principal
  location.reload()
}

// Exportar as funções
window.PIRATA_LEVEL = PIRATA_LEVEL
window.iniciarFasePirata = iniciarFasePirata
window.desbloquearFasePirata = desbloquearFasePirata
