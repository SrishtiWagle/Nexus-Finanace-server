const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget
} = require('../controllers/budget.controller');

router.use(authenticate);

router.get('/', getBudgets);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

module.exports = router;
