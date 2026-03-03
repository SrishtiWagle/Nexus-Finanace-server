const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  currency: { type: String, default: 'INR' },
  income: { type: Number, default: 0 },
  categories: {
    type: [String],
    default: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other']
  },
  refreshToken: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
