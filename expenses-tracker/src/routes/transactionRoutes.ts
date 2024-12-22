import { Router } from 'express';
import { Transaction } from '../models/transaction';

const router = Router();

// Find all the transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

export default router;
