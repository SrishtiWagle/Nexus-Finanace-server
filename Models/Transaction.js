const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String, default: '' },
  tags: { type: [String], default: [] },
  isRecurring: { type: Boolean, default: false },
  recurringInterval: { type: String, enum: ['daily', 'weekly', 'monthly', null], default: null },
  receipt: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
