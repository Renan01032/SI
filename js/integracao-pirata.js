// ============================================
// INTEGRAÇÃO DA FASE PIRATA AO SISTEMA EXISTENTE
// ============================================

// Adicione este código ao seu script.js existente

// 1. Modificar a função de compra na loja para desbloquear a fase
function comprarSkinPirata() {
  const creditosAtual = Number.parseInt(localStorage.getItem("creditos")) || 0
  const custoPirata = 500 // Créditos necessários

  if (creditosAtual >= custoPirata) {
    // Deduzir créditos
    const novosSaldos = creditosAtual - custoPirata
    localStorage.setItem("creditos", novosSaldos)

    // Registrar que a skin foi comprada
    const skinsPirata = JSON.parse(localStorage.getItem("skinsPirata")) || []
    if (!skinsPirata.includes("pirata")) {
      skinsPirata.push("pirata")
      localStorage.setItem("skinsPirata", JSON.stringify(skinsPirata))

      // DESBLOQUEAR A FASE!
      desbloquearFasePirata()

      // Atualizar display de créditos
      atualizarExibicaoCreditos()

      alert("✓ Skin do Pirata comprada com sucesso! A Fase Pirata foi desbloqueada!")
    }
  } else {
    alert("❌ Você não tem créditos suficientes. Custa " + custoPirata + " créditos.")
  }
}

// 2. Adicionar botão da fase pirata na seleção de fases
function adicionarFasePirataAoMenu() {
  const levelGrid = document.querySelector(".level-grid")

  // Verificar se a fase já foi adicionada
  if (document.getElementById("btn-fase-pirata")) return

  const botaoFasePirata = document.createElement("button")
  botaoFasePirata.id = "btn-fase-pirata"
  botaoFasePirata.className = "level-button"

  // Verificar se está desbloqueada
  const fasesPirata = JSON.parse(localStorage.getItem("fasesPirata")) || []
  const desbloqueada = fasesPirata.includes("pirata")

  if (desbloqueada) {
    botaoFasePirata.className += " unlocked"
    botaoFasePirata.innerHTML = "🏴‍☠️"
    botaoFasePirata.title = "Fase Pirata - Desbloqueada!"
    botaoFasePirata.addEventListener("click", () => iniciarFasePirata())
  } else {
    botaoFasePirata.className += " locked"
    botaoFasePirata.innerHTML = "🔒"
    botaoFasePirata.title = "Fase Pirata - Compre a Skin para Desbloquear"
    botaoFasePirata.addEventListener("click", () => {
      alert("Compre a Skin do Pirata na loja para desbloquear essa fase!")
    })
  }

  levelGrid.appendChild(botaoFasePirata)
}

// 3. Modificar a função de loja para incluir a skin do pirata
function adicionarSkinPirataAoShop() {
  const shopItems = document.querySelector(".shop-items")

  // Verificar se já foi adicionada
  if (document.querySelector(".skin-pirata-item")) return

  const itemPirata = document.createElement("div")
  itemPirata.className = "shop-item skin-pirata-item"
  itemPirata.style.background = "linear-gradient(135deg, #1a0f08, #5a3a2a)"
  itemPirata.style.border = "2px solid #FFD700"
  itemPirata.style.color = "#FFD700"

  itemPirata.innerHTML = `
    <h3>🏴‍☠️ Skin do Pirata</h3>
    <p>Desbloqueie a fase oculta "A Aventura do Pirata Silábico"</p>
    <p style="margin-top: 10px; font-weight: bold;">Custo: 500 créditos</p>
    <button onclick="comprarSkinPirata()" style="background: #FFD700; color: #000; padding: 10px 20px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;">
      Comprar
    </button>
  `

  shopItems.appendChild(itemPirata)
}

// 4. Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  // Adicionar a fase pirata à seleção de fases
  setTimeout(() => adicionarFasePirataAoMenu(), 500)

  // Adicionar skin pirata à loja
  setTimeout(() => adicionarSkinPirataAoShop(), 500)
})

// 5. Verificar e desbloquear se a skin já foi comprada (ao carregar)
window.addEventListener("load", () => {
  if (verificarSkinPirata()) {
    desbloquearFasePirata()
    adicionarFasePirataAoMenu()
  }
})

// Declaração das funções necessárias
function desbloquearFasePirata() {
  // Implementação para desbloquear a fase pirata
  const fasesPirata = JSON.parse(localStorage.getItem("fasesPirata")) || []
  if (!fasesPirata.includes("pirata")) {
    fasesPirata.push("pirata")
    localStorage.setItem("fasesPirata", JSON.stringify(fasesPirata))
  }
}

function atualizarExibicaoCreditos() {
  // Implementação para atualizar a exibição de créditos
  const creditosAtual = Number.parseInt(localStorage.getItem("creditos")) || 0
  const exibicaoCreditos = document.querySelector(".creditos")
  if (exibicaoCreditos) {
    exibicaoCreditos.textContent = "Créditos: " + creditosAtual
  }
}

function iniciarFasePirata() {
  // Implementação para iniciar a fase pirata
  alert("Iniciando Fase Pirata...")
}

function verificarSkinPirata() {
  // Implementação para verificar se a skin pirata já foi comprada
  const skinsPirata = JSON.parse(localStorage.getItem("skinsPirata")) || []
  return skinsPirata.includes("pirata")
}
