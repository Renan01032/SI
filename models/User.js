// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  credits: { type: Number, default: 0 },
  unlockedLevel: { type: Number, default: 1 },
  ownedSkins: { type: [String], default: ['default_male'] },
  currentSkin: { type: String, default: 'default_male' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;