const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  bulkDelete,
  exportCSV
} = require('../controllers/transaction.controller');

router.use(authenticate);

router.get('/export/csv', exportCSV);
router.get('/', getTransactions);
router.post('/', createTransaction);
router.get('/:id', getTransaction);
router.put('/:id', updateTransaction);
router.delete('/bulk', bulkDelete);
router.delete('/:id', deleteTransaction);

module.exports = router;
