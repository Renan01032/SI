const express = require("express")
const router = express.Router()
const User = require("../js/models/User");

// Cadastrar novo usuário
router.post("/cadastrar", async (req, res) => {
  try {
    const { nome, idade } = req.body

    // Validações básicas
    if (!nome || !idade) {
      return res.status(400).json({
        success: false,
        message: "Por favor, preencha nome e idade!",
      })
    }

    if (idade < 3 || idade > 15) {
      return res.status(400).json({
        success: false,
        message: "Idade deve estar entre 3 e 15 anos!",
      })
    }

    const existingUser = await User.findOne({ nome: nome.trim().toLowerCase() })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Já existe um jogador com este nome!",
      })
    }

    const newUser = new User({
      nome: nome.trim().toLowerCase(),
      idade: Number.parseInt(idade),
    })

    await newUser.save()

    res.status(201).json({
      success: true,
      message: "Conta criada com sucesso!",
      user: {
        id: newUser._id,
        nome: newUser.nome,
        idade: newUser.idade,
        gameState: newUser.gameState,
      },
    })
  } catch (error) {
    console.error("Erro ao cadastrar:", error)
    res.status(500).json({
      success: false,
      message: "Erro ao criar conta. Tente novamente!",
    })
  }
})

// Login de usuário
router.post("/login", async (req, res) => {
  try {
    const { nome, idade } = req.body

    if (!nome || !idade) {
      return res.status(400).json({
        success: false,
        message: "Por favor, digite seu nome e idade!",
      })
    }

    const user = await User.findOne({
      nome: nome.trim().toLowerCase(),
      idade: Number.parseInt(idade),
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Nome ou idade incorretos! Verifique seus dados.",
      })
    }

    // Atualiza último acesso
    user.ultimoAcesso = new Date()
    await user.save()

    res.json({
      success: true,
      message: "Bem-vindo de volta!",
      user: {
        id: user._id,
        nome: user.nome,
        idade: user.idade,
        gameState: user.gameState,
      },
    })
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    res.status(500).json({
      success: false,
      message: "Erro ao entrar. Tente novamente!",
    })
  }
})

// Salvar progresso do jogo
router.put("/salvar-progresso/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const { gameState } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado!",
      })
    }

    // Atualiza o estado do jogo
    user.gameState = {
      ...user.gameState,
      ...gameState,
    }
    user.ultimoAcesso = new Date()

    await user.save()

    res.json({
      success: true,
      message: "Progresso salvo!",
      gameState: user.gameState,
    })
  } catch (error) {
    console.error("Erro ao salvar progresso:", error)
    res.status(500).json({
      success: false,
      message: "Erro ao salvar progresso!",
    })
  }
})

// Buscar progresso do usuário
router.get("/progresso/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado!",
      })
    }

    res.json({
      success: true,
      gameState: user.gameState,
    })
  } catch (error) {
    console.error("Erro ao buscar progresso:", error)
    res.status(500).json({
      success: false,
      message: "Erro ao buscar progresso!",
    })
  }
})

module.exports = router
