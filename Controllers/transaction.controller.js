const Transaction = require('../models/Transaction');

// Create transaction
exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, user: req.userId });
    res.json({ success: true, data: transaction });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, startDate, endDate } = req.query;
    const filter = { user: req.userId };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, data: transactions, pagination: { page: Number(page), limit: Number(limit), total } });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get single transaction
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.userId });
    if (!transaction) return res.json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, data: transaction });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!transaction) return res.json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, data: transaction });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!transaction) return res.json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, data: 'Transaction deleted' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Bulk delete
exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    await Transaction.deleteMany({ _id: { $in: ids }, user: req.userId });
    res.json({ success: true, data: 'Transactions deleted' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
