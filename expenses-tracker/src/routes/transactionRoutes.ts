import { Router } from 'express';
import { Transaction } from '../models/transaction';

const router = Router();

// get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Update an existing route
// @ts-ignore
router.put('/:id', async (req, res) => {
    const transactionId = req.params.id;
    const transactionData = req.body;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await transaction.update(transactionData);
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Failed to update transaction:', error);
        // @ts-ignore
        res.status(500).json({ message: 'An error occurred while updating the transaction', error: error.message });
    }
});

// Add a new transaction
router.post('/', async (req, res) => {
    try {
        const transactionData = req.body;

        const maxIdTransaction = await Transaction.findOne({
            order: [['id', 'DESC']],
        });

        const nextId = maxIdTransaction ? maxIdTransaction.getDataValue('id') + 1 : 1;
        const newTransaction = await Transaction.create({
            ...transactionData,
            id: nextId,
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Failed to create transaction:', error);
        // @ts-ignore
        res.status(500).json({ message: 'Failed to create transaction', error: error.message });
    }
});



// Remove a transaction
// @ts-ignore
router.delete('/:id', async (req, res) => {
    const transactionId = req.params.id;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await transaction.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete transaction:', error);
        // @ts-ignore
        res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
    }
});

export default router;
