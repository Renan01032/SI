// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importe o modelo

// Rota para buscar os dados de um usuário
router.get('/:username', async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (!user) {
      // Se o usuário não existir, crie um novo
      user = new User({ username: req.params.username });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para atualizar os dados de um usuário
router.post('/:username', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true, upsert: true } // Cria um novo usuário se não encontrar
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;