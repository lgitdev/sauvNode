import { Router } from 'express';
import { Transaction } from '../models/transaction';

const router = Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     responses:
 *       200:
 *         description: A list of transactions.
 */
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a transaction
 *     description: Update an existing transaction by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the transaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated transaction.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Failed to update transaction.
 */
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


/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new transaction
 *     description: Add a new transaction to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created transaction.
 *       500:
 *         description: Failed to create transaction.
 */
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


/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a transaction
 *     description: Remove a transaction by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the transaction to delete
 *     responses:
 *       204:
 *         description: Transaction deleted successfully.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Failed to delete transaction.
 */
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
