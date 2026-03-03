const Budget = require('../models/Budget');
const Notification = require('../models/Notification');

// Create budget
exports.createBudget = async (req, res) => {
  try {
    const budget = await Budget.create({ ...req.body, user: req.userId });
    res.json({ success: true, data: budget });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get all budgets
exports.getBudgets = async (req, res) => {
  try {
    const { month, year } = req.query;
    const filter = { user: req.userId };
    if (month) filter.month = Number(month);
    if (year) filter.year = Number(year);

    const budgets = await Budget.find(filter);
    res.json({ success: true, data: budgets });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Update budget
exports.updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!budget) return res.json({ success: false, message: 'Budget not found' });
    res.json({ success: true, data: budget });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!budget) return res.json({ success: false, message: 'Budget not found' });
    res.json({ success: true, data: 'Budget deleted' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Check overspend
exports.checkOverspend = async (userId, category, month, year, amount) => {
  try {
    const budget = await Budget.findOne({ user: userId, category, month, year });
    if (!budget) return;

    budget.spent += amount;
    await budget.save();

    if (budget.spent >= budget.amount && !budget.notified) {
      budget.notified = true;
      await budget.save();
      await Notification.create({
        user: userId,
        message: `You have exceeded your budget for ${category}!`,
        type: 'budget'
      });
    }
  } catch (err) {
    console.error('Overspend check failed:', err.message);
  }
};
